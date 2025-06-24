
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
      <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 to-mint-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-soft-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 to-mint-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Failed to load profile</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-soft-blue-600 hover:text-soft-blue-700"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 to-mint-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <ProfileHeader 
          profile={profile}
          onSignOut={signOut}
        />
        
        <Card className="border-0 shadow-sm">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="skills">My Skills</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="p-6">
              <ProfileOverview 
                profile={profile}
                mySkills={mySkills}
                skillsLoading={skillsLoading}
                onRemoveSkill={removeSkill}
              />
            </TabsContent>
            
            <TabsContent value="skills" className="p-6">
              <ProfileSkills 
                profile={profile}
                mySkills={mySkills}
                skillsLoading={skillsLoading}
                onRemoveSkill={removeSkill}
              />
            </TabsContent>
            
            <TabsContent value="bookings" className="p-6">
              <ProfileBookings userId={profile.id} />
            </TabsContent>
            
            <TabsContent value="reviews" className="p-6">
              <ProfileReviews userId={profile.id} />
            </TabsContent>
            
            <TabsContent value="settings" className="p-6">
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
