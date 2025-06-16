
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useProfile } from '@/hooks/useProfile';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import SkillsSection from '@/components/profile/SkillsSection';
import EditProfileModal from '@/components/profile/EditProfileModal';
import AddSkillModal from '@/components/profile/AddSkillModal';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const { t } = useTranslation('profile');
  const { profile, loading, updating, updateProfile, addSkill, removeSkill } = useProfile();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-6 mx-auto mb-2" />
                  <Skeleton className="h-6 w-12 mx-auto mb-1" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Profile Not Found</h1>
          <p className="text-slate-600">Unable to load your profile information.</p>
        </div>
      </div>
    );
  }

  const handleAddSkill = () => {
    setIsAddSkillModalOpen(true);
  };

  const handleRemoveSkill = async (index: number) => {
    await removeSkill(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4">
        <ProfileHeader 
          profile={profile} 
          onEditClick={() => setIsEditModalOpen(true)} 
        />
        
        <ProfileStats profile={profile} />
        
        <SkillsSection 
          profile={profile} 
          onAddSkill={handleAddSkill}
          onRemoveSkill={handleRemoveSkill}
        />
        
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          profile={profile}
          onSave={updateProfile}
          updating={updating}
        />

        <AddSkillModal
          isOpen={isAddSkillModalOpen}
          onClose={() => setIsAddSkillModalOpen(false)}
          onAddSkill={addSkill}
        />
      </div>
    </div>
  );
};

export default Profile;
