
-- Add foreign key constraints to bookings table
ALTER TABLE bookings 
ADD CONSTRAINT fk_bookings_skill_id 
FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE;

ALTER TABLE bookings 
ADD CONSTRAINT fk_bookings_client_id 
FOREIGN KEY (client_id) REFERENCES profiles(id) ON DELETE CASCADE;

ALTER TABLE bookings 
ADD CONSTRAINT fk_bookings_provider_id 
FOREIGN KEY (provider_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Add review responses and voting system
ALTER TABLE reviews 
ADD COLUMN provider_response TEXT,
ADD COLUMN provider_response_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN upvotes INTEGER DEFAULT 0,
ADD COLUMN downvotes INTEGER DEFAULT 0;

-- Create review votes table
CREATE TABLE review_votes (
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

-- Add badge achievement tracking
ALTER TABLE user_badges 
ADD COLUMN description TEXT,
ADD COLUMN progress INTEGER DEFAULT 0,
ADD COLUMN target INTEGER DEFAULT 1,
ADD COLUMN achieved_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create user statistics view
CREATE OR REPLACE VIEW user_statistics AS
SELECT 
  p.id as user_id,
  p.name,
  COALESCE(skills_count.count, 0) as total_skills,
  COALESCE(bookings_count.count, 0) as total_bookings,
  COALESCE(reviews_count.count, 0) as total_reviews,
  COALESCE(avg_rating.rating, 0) as average_rating,
  COALESCE(badges_count.count, 0) as total_badges
FROM profiles p
LEFT JOIN (
  SELECT provider_id, COUNT(*) as count 
  FROM skills 
  WHERE is_active = true 
  GROUP BY provider_id
) skills_count ON p.id = skills_count.provider_id
LEFT JOIN (
  SELECT client_id, COUNT(*) as count 
  FROM bookings 
  GROUP BY client_id
) bookings_count ON p.id = bookings_count.client_id
LEFT JOIN (
  SELECT s.provider_id, COUNT(r.*) as count 
  FROM skills s 
  LEFT JOIN reviews r ON s.id = r.skill_id 
  GROUP BY s.provider_id
) reviews_count ON p.id = reviews_count.provider_id
LEFT JOIN (
  SELECT s.provider_id, AVG(r.rating) as rating 
  FROM skills s 
  LEFT JOIN reviews r ON s.id = r.skill_id 
  WHERE r.rating IS NOT NULL
  GROUP BY s.provider_id
) avg_rating ON p.id = avg_rating.provider_id
LEFT JOIN (
  SELECT user_id, COUNT(*) as count 
  FROM user_badges 
  GROUP BY user_id
) badges_count ON p.id = badges_count.user_id;

-- Add booking status constraints
ALTER TABLE bookings 
ADD CONSTRAINT valid_booking_status 
CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'refunded'));

-- Add review rating constraints
ALTER TABLE reviews 
ADD CONSTRAINT valid_rating 
CHECK (rating >= 1 AND rating <= 5);
