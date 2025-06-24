
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useMySkills } from '@/hooks/useMySkills';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileOverview from '@/components/profile/ProfileOverview';
import ProfileSkills from '@/components/profile/ProfileSkills';
import ProfileBookings from '@/components/profile/ProfileBookings';
import ProfileReviews from '@/components/profile/ProfileReviews';
import ProfileSettings from '@/components/profile/ProfileSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const Profile = () => {
  const { user, signOut } = useAuth();
  const { profile, loading, removeSkill, updateProfile } = useProfile();
  const { data: mySkills = [], isLoading: skillsLoading } = useMySkills();
  const { t } = useTranslation('profile');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-white to-mint-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-soft-blue-200 border-t-soft-blue-600 mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl animate-pulse">✨</span>
            </div>
          </div>
          <p className="text-slate-600 text-sm animate-pulse">Loading your amazing profile... 🚀</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-white to-mint-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">😔</div>
          <p className="text-slate-600 mb-4 text-sm">Oops! We couldn't load your profile</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-soft-blue-600 hover:text-soft-blue-700 text-sm bg-soft-blue-50 hover:bg-soft-blue-100 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
          >
            🔄 Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-white to-mint-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <ProfileHeader 
          profile={profile}
          onSignOut={signOut}
        />
        
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full h-auto p-1 bg-gradient-to-r from-slate-100 to-slate-50 overflow-x-auto border-b border-slate-200">
              <div className="flex min-w-full">
                <TabsTrigger 
                  value="overview" 
                  className="flex-1 min-w-0 text-xs sm:text-sm px-2 py-3 whitespace-nowrap data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 hover:scale-105"
                >
                  <span className="mr-1">🏠</span>
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="skills" 
                  className="flex-1 min-w-0 text-xs sm:text-sm px-2 py-3 whitespace-nowrap data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 hover:scale-105"
                >
                  <span className="mr-1">🎯</span>
                  Skills
                </TabsTrigger>
                <TabsTrigger 
                  value="bookings" 
                  className="flex-1 min-w-0 text-xs sm:text-sm px-2 py-3 whitespace-nowrap data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 hover:scale-105"
                >
                  <span className="mr-1">📅</span>
                  Bookings
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="flex-1 min-w-0 text-xs sm:text-sm px-2 py-3 whitespace-nowrap data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 hover:scale-105"
                >
                  <span className="mr-1">⭐</span>
                  Reviews
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="flex-1 min-w-0 text-xs sm:text-sm px-2 py-3 whitespace-nowrap data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 hover:scale-105"
                >
                  <span className="mr-1">⚙️</span>
                  Settings
                </TabsTrigger>
              </div>
            </TabsList>
            
            <TabsContent value="overview" className="p-3 sm:p-6 mt-0 animate-fade-in">
              <ProfileOverview 
                profile={profile}
                mySkills={mySkills}
                skillsLoading={skillsLoading}
                onRemoveSkill={removeSkill}
              />
            </TabsContent>
            
            <TabsContent value="skills" className="p-3 sm:p-6 mt-0 animate-fade-in">
              <ProfileSkills 
                profile={profile}
                mySkills={mySkills}
                skillsLoading={skillsLoading}
                onRemoveSkill={removeSkill}
              />
            </TabsContent>
            
            <TabsContent value="bookings" className="p-3 sm:p-6 mt-0 animate-fade-in">
              <ProfileBookings userId={profile.id} />
            </TabsContent>
            
            <TabsContent value="reviews" className="p-3 sm:p-6 mt-0 animate-fade-in">
              <ProfileReviews userId={profile.id} />
            </TabsContent>
            
            <TabsContent value="settings" className="p-3 sm:p-6 mt-0 animate-fade-in">
              <ProfileSettings 
                profile={profile}
                onUpdateProfile={updateProfile}
              />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
