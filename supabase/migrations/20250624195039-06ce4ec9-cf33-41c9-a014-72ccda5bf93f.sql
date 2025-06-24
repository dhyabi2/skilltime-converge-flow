
-- Add any missing indexes for better performance
CREATE INDEX IF NOT EXISTS idx_skills_location ON public.skills(location);
CREATE INDEX IF NOT EXISTS idx_skills_price ON public.skills(price);
CREATE INDEX IF NOT EXISTS idx_skills_duration ON public.skills(duration);

-- Create a table for skill availability slots
CREATE TABLE IF NOT EXISTS public.skill_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = Sunday, 6 = Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(skill_id, day_of_week, start_time)
);

-- Enable RLS on skill_availability
ALTER TABLE public.skill_availability ENABLE ROW LEVEL SECURITY;

-- RLS Policies for skill_availability
CREATE POLICY "Anyone can view skill availability" ON public.skill_availability 
  FOR SELECT USING (true);
CREATE POLICY "Users can manage their skill availability" ON public.skill_availability 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.skills 
      WHERE skills.id = skill_availability.skill_id 
      AND skills.provider_id = auth.uid()
    )
  );

-- Create indexes for skill_availability
CREATE INDEX idx_skill_availability_skill ON public.skill_availability(skill_id);
CREATE INDEX idx_skill_availability_day ON public.skill_availability(day_of_week);
