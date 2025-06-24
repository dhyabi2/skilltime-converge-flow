import React from 'react';
import { Calendar, Star, Award } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { UserProfile } from '@/types/profile';

interface ProfileStatsProps {
  profile: UserProfile;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ profile }) => {
  const stats = [
    {
      icon: Calendar,
      label: 'Bookings',
      value: profile.completedBookings,
      color: 'text-soft-blue-600'
    },
    {
      icon: Star,
      label: 'Rating',
      value: `${profile.rating}/5`,
      color: 'text-mint-600'
    },
    {
      icon: Award,
      label: 'Badges',
      value: profile.badges.length,
      color: 'text-soft-blue-600'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ProfileStats;
