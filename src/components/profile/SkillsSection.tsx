
import React from 'react';
import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from '@/hooks/useProfile';

interface SkillsSectionProps {
  profile: UserProfile;
  onRemoveSkill: (index: number) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ profile, onRemoveSkill }) => {
  return (
    <Card className="border-0 shadow-sm mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-slate-800">Skills</CardTitle>
      </CardHeader>
      <CardContent>
        {profile.skills.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-500 mb-4">No skills added yet</p>
            <p className="text-sm text-slate-400">Add skills using the Skills Marketplace section below.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="bg-soft-blue-100 text-soft-blue-800 hover:bg-soft-blue-200 group relative pr-8"
              >
                {skill}
                <button
                  onClick={() => onRemoveSkill(index)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3 text-soft-blue-600 hover:text-red-600" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
