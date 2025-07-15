
-- Add foreign key constraints that were missing
ALTER TABLE bookings 
ADD CONSTRAINT fk_bookings_skill_id 
FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE;

ALTER TABLE bookings 
ADD CONSTRAINT fk_bookings_client_id 
FOREIGN KEY (client_id) REFERENCES profiles(id) ON DELETE CASCADE;

ALTER TABLE bookings 
ADD CONSTRAINT fk_bookings_provider_id 
FOREIGN KEY (provider_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Add missing columns to reviews table for proper review management
ALTER TABLE reviews 
ADD COLUMN IF NOT EXISTS provider_response TEXT,
ADD COLUMN IF NOT EXISTS provider_response_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS upvotes INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS downvotes INTEGER DEFAULT 0;

-- Create review votes table for voting system
CREATE TABLE IF NOT EXISTS review_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  vote_type TEXT CHECK (vote_type IN ('up', 'down')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(review_id, user_id)
);

-- Enable RLS for review votes
ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;

-- Create policies for review votes
CREATE POLICY "Users can view all review votes" 
  ON review_votes FOR SELECT 
  USING (true);

CREATE POLICY "Users can create their own votes" 
  ON review_votes FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own votes" 
  ON review_votes FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own votes" 
  ON review_votes FOR DELETE 
  USING (auth.uid() = user_id);

-- Add proper booking status constraints
ALTER TABLE bookings 
ADD CONSTRAINT valid_booking_status 
CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'refunded'));

-- Add review rating constraints
ALTER TABLE reviews 
ADD CONSTRAINT valid_rating 
CHECK (rating >= 1 AND rating <= 5);

-- Create booking availability function
CREATE OR REPLACE FUNCTION check_booking_availability(
  p_skill_id UUID,
  p_booking_date DATE,
  p_booking_time TIME,
  p_duration TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  slot_available BOOLEAN := false;
  day_of_week INTEGER;
  booking_end_time TIME;
BEGIN
  -- Get day of week (0 = Sunday, 1 = Monday, etc.)
  day_of_week := EXTRACT(DOW FROM p_booking_date);
  
  -- Calculate end time based on duration
  booking_end_time := p_booking_time + (p_duration || ' minutes')::INTERVAL;
  
  -- Check if the time slot is within available hours
  SELECT EXISTS(
    SELECT 1 FROM skill_availability sa
    WHERE sa.skill_id = p_skill_id
    AND sa.day_of_week = day_of_week
    AND sa.start_time <= p_booking_time
    AND sa.end_time >= booking_end_time
    AND sa.is_available = true
  ) INTO slot_available;
  
  -- Check if there are no conflicting bookings
  IF slot_available THEN
    SELECT NOT EXISTS(
      SELECT 1 FROM bookings b
      WHERE b.skill_id = p_skill_id
      AND b.booking_date = p_booking_date
      AND b.status IN ('pending', 'confirmed')
      AND (
        (b.booking_time, b.booking_time + (b.duration || ' minutes')::INTERVAL) 
        OVERLAPS 
        (p_booking_time, booking_end_time)
      )
    ) INTO slot_available;
  END IF;
  
  RETURN slot_available;
END;
$$ LANGUAGE plpgsql;

-- Create function to get available time slots for a skill on a specific date
CREATE OR REPLACE FUNCTION get_available_time_slots(
  p_skill_id UUID,
  p_date DATE
) RETURNS TABLE(time_slot TIME) AS $$
DECLARE
  day_of_week INTEGER;
  slot_time TIME;
  slot_duration INTEGER := 60; -- 60 minute slots
BEGIN
  day_of_week := EXTRACT(DOW FROM p_date);
  
  -- Return available time slots
  FOR slot_time IN
    SELECT generate_series(
      sa.start_time,
      sa.end_time - (slot_duration || ' minutes')::INTERVAL,
      (slot_duration || ' minutes')::INTERVAL
    )::TIME
    FROM skill_availability sa
    WHERE sa.skill_id = p_skill_id
    AND sa.day_of_week = day_of_week
    AND sa.is_available = true
  LOOP
    -- Check if this slot is available (no conflicting bookings)
    IF check_booking_availability(p_skill_id, p_date, slot_time, slot_duration::TEXT) THEN
      time_slot := slot_time;
      RETURN NEXT;
    END IF;
  END LOOP;
  
  RETURN;
END;
$$ LANGUAGE plpgsql;

-- Create function to automatically update review statistics
CREATE OR REPLACE FUNCTION update_review_statistics()
RETURNS TRIGGER AS $$
BEGIN
  -- Update vote counts when review_votes change
  IF TG_TABLE_NAME = 'review_votes' THEN
    UPDATE reviews SET
      upvotes = (
        SELECT COUNT(*) FROM review_votes 
        WHERE review_id = COALESCE(NEW.review_id, OLD.review_id) 
        AND vote_type = 'up'
      ),
      downvotes = (
        SELECT COUNT(*) FROM review_votes 
        WHERE review_id = COALESCE(NEW.review_id, OLD.review_id) 
        AND vote_type = 'down'
      )
    WHERE id = COALESCE(NEW.review_id, OLD.review_id);
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic review statistics updates
DROP TRIGGER IF EXISTS trigger_update_review_statistics_insert ON review_votes;
CREATE TRIGGER trigger_update_review_statistics_insert
  AFTER INSERT ON review_votes
  FOR EACH ROW EXECUTE FUNCTION update_review_statistics();

DROP TRIGGER IF EXISTS trigger_update_review_statistics_update ON review_votes;
CREATE TRIGGER trigger_update_review_statistics_update
  AFTER UPDATE ON review_votes
  FOR EACH ROW EXECUTE FUNCTION update_review_statistics();

DROP TRIGGER IF EXISTS trigger_update_review_statistics_delete ON review_votes;
CREATE TRIGGER trigger_update_review_statistics_delete
  AFTER DELETE ON review_votes
  FOR EACH ROW EXECUTE FUNCTION update_review_statistics();

-- Create view for enhanced booking details
CREATE OR REPLACE VIEW booking_details AS
SELECT 
  b.*,
  s.title as skill_title,
  s.description as skill_description,
  s.image_url as skill_image,
  s.price as skill_price,
  client.name as client_name,
  client.email as client_email,
  client.avatar as client_avatar,
  provider.name as provider_name,
  provider.email as provider_email,
  provider.avatar as provider_avatar
FROM bookings b
LEFT JOIN skills s ON b.skill_id = s.id
LEFT JOIN profiles client ON b.client_id = client.id
LEFT JOIN profiles provider ON b.provider_id = provider.id;

-- Create view for enhanced review details
CREATE OR REPLACE VIEW review_details AS
SELECT 
  r.*,
  reviewer.name as reviewer_name,
  reviewer.avatar as reviewer_avatar,
  s.title as skill_title,
  s.provider_id as skill_provider_id,
  provider.name as provider_name
FROM reviews r
LEFT JOIN profiles reviewer ON r.reviewer_id = reviewer.id
LEFT JOIN skills s ON r.skill_id = s.id
LEFT JOIN profiles provider ON s.provider_id = provider.id;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_client_date ON bookings(client_id, booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_provider_date ON bookings(provider_id, booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_skill_date ON bookings(skill_id, booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_reviews_skill_rating ON reviews(skill_id, rating);
CREATE INDEX IF NOT EXISTS idx_reviews_provider ON reviews(skill_id) WHERE skill_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_review_votes_review ON review_votes(review_id);
CREATE INDEX IF NOT EXISTS idx_skill_availability_skill_day ON skill_availability(skill_id, day_of_week);
