
import React from 'react';
import { Calendar, Star, Award, Plus, TrendingUp, Target, Zap, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { UserProfile } from '@/hooks/useProfile';
import CreateSkillModal from '@/components/skills/CreateSkillModal';

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

  const CircularProgress = ({ value, size = 60, strokeWidth = 6 }: { value: number, size?: number, strokeWidth?: number }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgb(226 232 240)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(56 189 248)" />
              <stop offset="100%" stopColor="rgb(45 212 191)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-slate-800">{value}%</span>
        </div>
      </div>
    );
  };

  const stats = [
    {
      icon: Calendar,
      label: 'Bookings',
      value: profile.completedBookings,
      color: 'text-soft-blue-600',
      bgColor: 'bg-soft-blue-50',
      emoji: '📅'
    },
    {
      icon: Star,
      label: 'Rating',
      value: `${profile.rating}/5`,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      emoji: '⭐'
    },
    {
      icon: Award,
      label: 'Skills',
      value: mySkills.length,
      color: 'text-mint-600',
      bgColor: 'bg-mint-50',
      emoji: '🎯'
    },
    {
      icon: Heart,
      label: 'Completion',
      value: `${profileCompletion}%`,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      emoji: '💖'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Message */}
      <div className="text-center py-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
          Welcome back, {profile.name || 'Friend'}! 🎉
        </h2>
        <p className="text-slate-600 text-sm">Ready to make today amazing? Let's see what you can accomplish!</p>
      </div>

      {/* Profile Completion with Circular Progress */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-soft-blue-50 to-mint-50 hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <div className="p-2 bg-gradient-to-br from-soft-blue-400 to-mint-400 rounded-full">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            Profile Power-Up! ⚡
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center gap-4">
          <CircularProgress value={profileCompletion} />
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm text-slate-600 mb-2">
              🚀 You're {profileCompletion}% complete! {profileCompletion < 100 ? "Let's boost your profile power!" : "You're a profile superstar! 🌟"}
            </p>
            {profileCompletion < 100 && (
              <div className="flex flex-wrap gap-1 text-xs">
                {!profile.name && <Badge variant="outline" className="bg-yellow-100">📝 Add name</Badge>}
                {!profile.bio && <Badge variant="outline" className="bg-yellow-100">💭 Add bio</Badge>}
                {!profile.location && <Badge variant="outline" className="bg-yellow-100">📍 Add location</Badge>}
                {!profile.phone && <Badge variant="outline" className="bg-yellow-100">📱 Add phone</Badge>}
                {!profile.avatar && <Badge variant="outline" className="bg-yellow-100">📸 Add photo</Badge>}
                {profile.skills.length === 0 && <Badge variant="outline" className="bg-yellow-100">🎯 Add skills</Badge>}
                {mySkills.length === 0 && <Badge variant="outline" className="bg-yellow-100">💼 Create service</Badge>}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Animated Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index} 
              className={`border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer ${stat.bgColor} group`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-3 sm:p-4 text-center">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 rounded-full ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <span className="text-lg sm:text-xl">{stat.emoji}</span>
                </div>
                <div className={`text-lg sm:text-2xl font-bold ${stat.color} group-hover:scale-110 transition-transform duration-200`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-600">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Interactive Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Your Skills */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <span className="text-xl">🎨</span>
              Your Amazing Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            {profile.skills.length === 0 ? (
              <div className="text-center py-3 sm:py-4">
                <div className="text-4xl mb-2 animate-bounce">🌟</div>
                <p className="text-slate-500 mb-1 sm:mb-2 text-sm">No skills yet? Let's change that!</p>
                <p className="text-xs sm:text-sm text-slate-400">Add skills to show off your talents</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {profile.skills.slice(0, 5).map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-purple-100 text-purple-800 text-xs hover:bg-purple-200 hover:scale-105 transition-all duration-200 cursor-default"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    ✨ {skill}
                  </Badge>
                ))}
                {profile.skills.length > 5 && (
                  <Badge variant="outline" className="text-xs hover:scale-105 transition-transform duration-200">
                    +{profile.skills.length - 5} more awesome skills! 🚀
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Marketplace Skills */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-mint-50">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <span className="text-xl">💰</span>
                Money Makers
              </CardTitle>
              <CreateSkillModal />
            </div>
          </CardHeader>
          <CardContent>
            {skillsLoading ? (
              <div className="text-center py-3 sm:py-4">
                <div className="animate-spin text-2xl mb-2">⏳</div>
                <p className="text-slate-500 text-sm">Loading your awesome services...</p>
              </div>
            ) : mySkills.length === 0 ? (
              <div className="text-center py-3 sm:py-4">
                <div className="text-4xl mb-2 animate-pulse">💡</div>
                <p className="text-slate-500 mb-1 sm:mb-2 text-sm">Ready to start earning?</p>
                <p className="text-xs sm:text-sm text-slate-400">Create your first service and start making money!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {mySkills.slice(0, 2).map((skill, index) => (
                  <div 
                    key={skill.id} 
                    className="flex items-center justify-between p-2 bg-white/70 rounded-lg hover:bg-white transition-all duration-200 hover:scale-102"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-xs sm:text-sm truncate">💼 {skill.skillTitle}</p>
                      <p className="text-xs text-green-600 font-semibold">💵 {skill.price} OMR</p>
                    </div>
                    <Badge variant="secondary" className="text-xs ml-2 shrink-0 bg-green-100 text-green-700 hover:scale-105 transition-transform duration-200">
                      📍 {skill.location}
                    </Badge>
                  </div>
                ))}
                {mySkills.length > 2 && (
                  <p className="text-xs text-slate-500 text-center">
                    +{mySkills.length - 2} more money-making skills! 🤑
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <span className="text-xl">📊</span>
            Your Journey So Far
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 sm:py-8">
            <div className="text-4xl mb-3 animate-bounce">🎯</div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">Your adventure is just beginning!</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Once you start booking services or providing skills, your activity timeline will appear here. 
              Get ready for an amazing journey! 🚀
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileOverview;
