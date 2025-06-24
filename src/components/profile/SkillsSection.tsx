
import React from 'react';
import { X, Sparkles, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from '@/hooks/useProfile';

interface SkillsSectionProps {
  profile: UserProfile;
  onRemoveSkill: (index: number) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ profile, onRemoveSkill }) => {
  return (
    <Card className="border-0 shadow-lg mb-6 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          Your Skill Collection ✨
        </CardTitle>
        <p className="text-xs sm:text-sm text-slate-600">Show off what makes you special! 🌟</p>
      </CardHeader>
      <CardContent>
        {profile.skills.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4 animate-pulse">🎨</div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">No skills added yet</h3>
            <p className="text-slate-500 mb-4">Every expert was once a beginner! 💪</p>
            <div className="bg-white/50 rounded-lg p-4 border-2 border-dashed border-purple-200">
              <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600">Add skills using the Money-Making Skills section below to get started! 🚀</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="bg-purple-100 text-purple-800 hover:bg-purple-200 group relative pr-8 text-xs sm:text-sm py-1.5 px-3 hover:scale-105 transition-all duration-200 cursor-default"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="mr-1">🎯</span>
                {skill}
                <button
                  onClick={() => onRemoveSkill(index)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 p-0.5 rounded-full hover:bg-red-100"
                  title="Remove skill"
                >
                  <X className="w-3 h-3 text-red-500 hover:text-red-700" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        
        {profile.skills.length > 0 && (
          <div className="mt-4 p-3 bg-white/50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>You have {profile.skills.length} awesome skill{profile.skills.length !== 1 ? 's' : ''}! Amazing! 🎉</span>
              <Sparkles className="w-4 h-4 text-purple-500" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
