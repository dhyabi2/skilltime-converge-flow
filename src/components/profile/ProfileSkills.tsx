
import React from 'react';
import { Plus, Star, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UserProfile } from '@/hooks/useProfile';
import CreateSkillModal from '@/components/skills/CreateSkillModal';
import SkillsSection from '@/components/profile/SkillsSection';

interface ProfileSkillsProps {
  profile: UserProfile;
  mySkills: any[];
  skillsLoading: boolean;
  onRemoveSkill: (index: number) => void;
}

const ProfileSkills: React.FC<ProfileSkillsProps> = ({ 
  profile, 
  mySkills, 
  skillsLoading,
  onRemoveSkill 
}) => {
  return (
    <div className="space-y-6">
      {/* Profile Skills */}
      <SkillsSection 
        profile={profile}
        onRemoveSkill={onRemoveSkill}
      />

      <Separator />

      {/* Marketplace Skills */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Marketplace Skills</CardTitle>
              <p className="text-sm text-slate-600 mt-1">Skills you offer to earn income</p>
            </div>
            <CreateSkillModal />
          </div>
        </CardHeader>
        <CardContent>
          {skillsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-soft-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading your skills...</p>
            </div>
          ) : mySkills.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-soft-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-soft-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No marketplace skills yet</h3>
              <p className="text-slate-600 mb-4">Start earning by sharing your expertise with others</p>
              <CreateSkillModal />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mySkills.map((skill) => (
                <Card key={skill.id} className="border border-slate-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-slate-800 line-clamp-1">{skill.skillTitle}</h3>
                      <Badge variant="secondary" className="ml-2 shrink-0">
                        {skill.price} OMR
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">{skill.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{skill.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{skill.duration}</span>
                      </div>
                      {skill.rating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current text-yellow-500" />
                          <span>{skill.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <Button variant="outline" size="sm" className="w-full">
                        Manage Skill
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSkills;
