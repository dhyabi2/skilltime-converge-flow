
import React, { useState } from 'react';
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
      <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 to-mint-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-soft-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 text-sm">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 to-mint-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-slate-600 mb-4 text-sm">Failed to load profile</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-soft-blue-600 hover:text-soft-blue-700 text-sm"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 to-mint-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <ProfileHeader 
          profile={profile}
          onSignOut={signOut}
        />
        
        <Card className="border-0 shadow-sm">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full h-auto p-1 bg-slate-100 overflow-x-auto">
              <div className="flex min-w-full">
                <TabsTrigger value="overview" className="flex-1 min-w-0 text-xs sm:text-sm px-2 py-2 whitespace-nowrap">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex-1 min-w-0 text-xs sm:text-sm px-2 py-2 whitespace-nowrap">
                  Skills
                </TabsTrigger>
                <TabsTrigger value="bookings" className="flex-1 min-w-0 text-xs sm:text-sm px-2 py-2 whitespace-nowrap">
                  Bookings
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1 min-w-0 text-xs sm:text-sm px-2 py-2 whitespace-nowrap">
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex-1 min-w-0 text-xs sm:text-sm px-2 py-2 whitespace-nowrap">
                  Settings
                </TabsTrigger>
              </div>
            </TabsList>
            
            <TabsContent value="overview" className="p-3 sm:p-6 mt-0">
              <ProfileOverview 
                profile={profile}
                mySkills={mySkills}
                skillsLoading={skillsLoading}
                onRemoveSkill={removeSkill}
              />
            </TabsContent>
            
            <TabsContent value="skills" className="p-3 sm:p-6 mt-0">
              <ProfileSkills 
                profile={profile}
                mySkills={mySkills}
                skillsLoading={skillsLoading}
                onRemoveSkill={removeSkill}
              />
            </TabsContent>
            
            <TabsContent value="bookings" className="p-3 sm:p-6 mt-0">
              <ProfileBookings userId={profile.id} />
            </TabsContent>
            
            <TabsContent value="reviews" className="p-3 sm:p-6 mt-0">
              <ProfileReviews userId={profile.id} />
            </TabsContent>
            
            <TabsContent value="settings" className="p-3 sm:p-6 mt-0">
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
