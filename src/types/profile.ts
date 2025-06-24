
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  phone: string;
  joinedDate: string;
  completedBookings: number;
  rating: number;
  skills: string[];
  badges: string[];
}
