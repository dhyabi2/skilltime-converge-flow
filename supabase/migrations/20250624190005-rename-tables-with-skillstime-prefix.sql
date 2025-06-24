
-- Rename tables with skillstime_ prefix (policies are automatically renamed)
-- This migration assumes the tables were already renamed in a previous migration
-- If not, uncomment the lines below:

-- ALTER TABLE public.profiles RENAME TO skillstime_profiles;
-- ALTER TABLE public.user_skills RENAME TO skillstime_user_skills;
-- ALTER TABLE public.user_badges RENAME TO skillstime_user_badges;

-- Update the handle_new_user function to use the new table name
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.skillstime_profiles (id, name, email, avatar)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
