
import React from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserProfile } from '@/hooks/useProfile';

interface SkillsSectionProps {
  profile: UserProfile;
  onAddSkill: () => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ profile, onAddSkill }) => {
  return (
    <Card className="border-0 shadow-sm mb-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800">Skills</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onAddSkill}
            className="text-soft-blue-600 border-soft-blue-200 hover:bg-soft-blue-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Skill
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="bg-soft-blue-100 text-soft-blue-800 hover:bg-soft-blue-200"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
