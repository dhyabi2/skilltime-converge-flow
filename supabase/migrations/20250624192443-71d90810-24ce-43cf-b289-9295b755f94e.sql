
-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  icon_type TEXT NOT NULL,
  skill_count INTEGER DEFAULT 0,
  gradient TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create subcategories table
CREATE TABLE public.subcategories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  skill_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create skills table
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id),
  subcategory_id UUID REFERENCES public.subcategories(id),
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration TEXT NOT NULL,
  location TEXT DEFAULT 'Remote',
  image_url TEXT,
  is_top_rated BOOLEAN DEFAULT false,
  expertise TEXT[] DEFAULT '{}',
  use_cases TEXT[] DEFAULT '{}',
  published_date DATE DEFAULT CURRENT_DATE,
  weekly_exchanges INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(skill_id, reviewer_id)
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  duration TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
  location TEXT DEFAULT 'Remote',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories and subcategories (public read access)
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Anyone can view subcategories" ON public.subcategories FOR SELECT USING (true);

-- RLS Policies for skills
CREATE POLICY "Anyone can view active skills" ON public.skills 
  FOR SELECT USING (is_active = true);
CREATE POLICY "Users can manage their own skills" ON public.skills 
  FOR ALL USING (auth.uid() = provider_id);

-- RLS Policies for reviews
CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews" ON public.reviews 
  FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "Users can update their own reviews" ON public.reviews 
  FOR UPDATE USING (auth.uid() = reviewer_id);

-- RLS Policies for bookings
CREATE POLICY "Users can view their bookings" ON public.bookings 
  FOR SELECT USING (auth.uid() = client_id OR auth.uid() = provider_id);
CREATE POLICY "Users can create bookings as client" ON public.bookings 
  FOR INSERT WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Users can update their bookings" ON public.bookings 
  FOR UPDATE USING (auth.uid() = client_id OR auth.uid() = provider_id);

-- RLS Policies for notifications
CREATE POLICY "Users can view their notifications" ON public.notifications 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their notifications" ON public.notifications 
  FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_skills_category ON public.skills(category_id);
CREATE INDEX idx_skills_provider ON public.skills(provider_id);
CREATE INDEX idx_skills_active ON public.skills(is_active);
CREATE INDEX idx_reviews_skill ON public.reviews(skill_id);
CREATE INDEX idx_bookings_client ON public.bookings(client_id);
CREATE INDEX idx_bookings_provider ON public.bookings(provider_id);
CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_unread ON public.notifications(user_id, read);

-- Insert sample categories
INSERT INTO public.categories (title, icon_type, skill_count, gradient) VALUES
('design', 'design', 0, 'bg-gradient-to-br from-soft-blue-300 to-mint-300'),
('development', 'development', 0, 'bg-gradient-to-br from-soft-blue-400 to-mint-400'),
('marketing', 'marketing', 0, 'bg-gradient-to-br from-mint-300 to-soft-blue-300'),
('writing', 'writing', 0, 'bg-gradient-to-br from-mint-400 to-soft-blue-400'),
('music', 'music', 0, 'bg-gradient-to-br from-soft-blue-300 to-mint-300'),
('photography', 'photography', 0, 'bg-gradient-to-br from-mint-300 to-soft-blue-300');
