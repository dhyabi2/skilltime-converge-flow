
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  user: User;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <button onClick={handleProfileClick} className="focus:outline-none">
      <Avatar className="h-8 w-8 ring-2 ring-white/50 hover:ring-white/70 transition-all duration-200 cursor-pointer hover:scale-105">
        <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || 'User'} />
        <AvatarFallback className="bg-slate-100 text-slate-700 text-xs">
          {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
        </AvatarFallback>
      </Avatar>
    </button>
  );
};

export default UserAvatar;
