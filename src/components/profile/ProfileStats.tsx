
import React from 'react';
import { Calendar, Star, Award } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { UserProfile } from '@/hooks/useProfile';
import { useRealTimeStats } from '@/hooks/useRealTimeStats';

interface ProfileStatsProps {
  profile: UserProfile;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ profile }) => {
  const { stats, isLoading } = useRealTimeStats();

  const statsData = [
    {
      icon: Calendar,
      label: 'Bookings',
      value: stats?.total_bookings || profile.completedBookings,
      color: 'text-soft-blue-600'
    },
    {
      icon: Star,
      label: 'Rating',
      value: stats?.average_rating ? `${stats.average_rating}/5` : `${profile.rating}/5`,
      color: 'text-mint-600'
    },
    {
      icon: Award,
      label: 'Badges',
      value: stats?.total_badges || profile.badges.length,
      color: 'text-soft-blue-600'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-slate-800">
                {isLoading ? (
                  <div className="animate-pulse bg-slate-200 rounded h-6 w-8 mx-auto"></div>
                ) : (
                  stat.value
                )}
              </div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ProfileStats;
