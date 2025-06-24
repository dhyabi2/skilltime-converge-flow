
import React from 'react';
import { Calendar, Star, Award, Plus, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { UserProfile } from '@/hooks/useProfile';
import CreateSkillModal from '@/components/skills/CreateSkillModal';
import SkillCard from '@/components/discovery/SkillCard';

interface ProfileOverviewProps {
  profile: UserProfile;
  mySkills: any[];
  skillsLoading: boolean;
  onRemoveSkill: (index: number) => void;
}

const ProfileOverview: React.FC<ProfileOverviewProps> = ({ 
  profile, 
  mySkills, 
  skillsLoading,
  onRemoveSkill 
}) => {
  const profileCompletion = React.useMemo(() => {
    let completed = 0;
    const total = 7;
    
    if (profile.name) completed++;
    if (profile.bio) completed++;
    if (profile.location) completed++;
    if (profile.phone) completed++;
    if (profile.avatar) completed++;
    if (profile.skills.length > 0) completed++;
    if (mySkills.length > 0) completed++;
    
    return Math.round((completed / total) * 100);
  }, [profile, mySkills]);

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
      label: 'Skills',
      value: mySkills.length,
      color: 'text-soft-blue-600'
    },
    {
      icon: TrendingUp,
      label: 'Profile',
      value: `${profileCompletion}%`,
      color: 'text-mint-600'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Profile Completion */}
      <Card>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            Profile Completion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span>Complete your profile to attract more clients</span>
              <span className="font-medium">{profileCompletion}%</span>
            </div>
            <Progress value={profileCompletion} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-3 sm:p-4 text-center">
                <Icon className={`w-4 h-4 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 ${stat.color}`} />
                <div className="text-lg sm:text-2xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-xs sm:text-sm text-slate-600">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Profile Skills */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Your Skills</CardTitle>
          </CardHeader>
          <CardContent>
            {profile.skills.length === 0 ? (
              <div className="text-center py-3 sm:py-4">
                <p className="text-slate-500 mb-1 sm:mb-2 text-sm">No skills added yet</p>
                <p className="text-xs sm:text-sm text-slate-400">Add skills to your profile</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {profile.skills.slice(0, 5).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-soft-blue-100 text-soft-blue-800 text-xs">
                    {skill}
                  </Badge>
                ))}
                {profile.skills.length > 5 && (
                  <Badge variant="outline" className="text-xs">+{profile.skills.length - 5} more</Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Marketplace Skills */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg">Marketplace Skills</CardTitle>
              <CreateSkillModal />
            </div>
          </CardHeader>
          <CardContent>
            {skillsLoading ? (
              <div className="text-center py-3 sm:py-4">
                <div className="animate-spin rounded-full h-4 w-4 sm:h-6 sm:w-6 border-b-2 border-soft-blue-600 mx-auto"></div>
              </div>
            ) : mySkills.length === 0 ? (
              <div className="text-center py-3 sm:py-4">
                <p className="text-slate-500 mb-1 sm:mb-2 text-sm">No marketplace skills yet</p>
                <p className="text-xs sm:text-sm text-slate-400">Create skills to earn income</p>
              </div>
            ) : (
              <div className="space-y-2">
                {mySkills.slice(0, 2).map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-xs sm:text-sm truncate">{skill.skillTitle}</p>
                      <p className="text-xs text-slate-600">{skill.price} OMR</p>
                    </div>
                    <Badge variant="secondary" className="text-xs ml-2 shrink-0">
                      {skill.location}
                    </Badge>
                  </div>
                ))}
                {mySkills.length > 2 && (
                  <p className="text-xs text-slate-500 text-center">+{mySkills.length - 2} more skills</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity placeholder */}
      <Card>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 sm:py-8">
            <p className="text-slate-500 text-sm">No recent activity</p>
            <p className="text-xs sm:text-sm text-slate-400">Your bookings and skill interactions will appear here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileOverview;
