
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import SkillsSection from '@/components/profile/SkillsSection';
import CreateSkillModal from '@/components/skills/CreateSkillModal';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  const { user, signOut } = useAuth();
  const { profile, loading, removeSkill } = useProfile();
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
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <ProfileHeader 
          profile={profile}
          onSignOut={signOut}
        />
        
        <ProfileStats profile={profile} />
        
        <SkillsSection 
          profile={profile}
          onRemoveSkill={removeSkill}
        />

        {/* Skills Marketplace Section */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Skills Marketplace</h3>
              <CreateSkillModal />
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Share your expertise and earn by offering your skills to others.
            </p>
            <Separator className="my-3" />
            <p className="text-xs text-slate-500">
              Create skills to appear in the marketplace where others can book your services.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
