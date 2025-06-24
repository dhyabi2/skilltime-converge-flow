
import React from 'react';
import { Plus, Star, MapPin, Clock, Zap, Trophy, Heart } from 'lucide-react';
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
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Header */}
      <div className="text-center py-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
          <span className="text-2xl">🎯</span>
          Your Skill Showcase
        </h2>
        <p className="text-slate-600 text-sm">Show the world what you're amazing at! ✨</p>
      </div>

      {/* Profile Skills */}
      <SkillsSection 
        profile={profile}
        onRemoveSkill={onRemoveSkill}
      />

      <Separator className="my-6" />

      {/* Marketplace Skills */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-mint-50">
        <CardHeader className="pb-3 sm:pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-green-400 to-mint-400 rounded-full">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                Money-Making Skills 💰
              </CardTitle>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">Turn your talents into treasure! 🏆</p>
            </div>
            <CreateSkillModal />
          </div>
        </CardHeader>
        <CardContent>
          {skillsLoading ? (
            <div className="text-center py-6 sm:py-8">
              <div className="relative">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-4 border-mint-200 border-t-mint-600 mx-auto mb-3 sm:mb-4"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg">⚡</span>
                </div>
              </div>
              <p className="text-slate-600 text-sm">Loading your amazing skills... ✨</p>
            </div>
          ) : mySkills.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <div className="text-6xl mb-4 animate-bounce">🚀</div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">Ready to start earning?</h3>
              <p className="text-slate-600 mb-3 sm:mb-4 text-sm">Share your expertise and turn your skills into income! 💡</p>
              <div className="flex flex-col items-center gap-2">
                <CreateSkillModal />
                <p className="text-xs text-slate-500">It only takes 2 minutes to get started! ⏱️</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {mySkills.map((skill, index) => (
                <Card 
                  key={skill.id} 
                  className="border border-slate-200 hover:border-mint-300 hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/70 hover:bg-white group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <h3 className="font-semibold text-slate-800 line-clamp-1 text-sm sm:text-base flex-1 mr-2 group-hover:text-mint-700 transition-colors duration-200">
                        ⭐ {skill.skillTitle}
                      </h3>
                      <Badge 
                        variant="secondary" 
                        className="shrink-0 text-xs bg-green-100 text-green-800 hover:bg-green-200 hover:scale-105 transition-all duration-200"
                      >
                        💰 {skill.price} OMR
                      </Badge>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-slate-600 mb-2 sm:mb-3 line-clamp-2">
                      {skill.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-slate-500 mb-2 sm:mb-3">
                      <div className="flex items-center gap-1 bg-slate-50 rounded-full px-2 py-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">📍 {skill.location}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-slate-50 rounded-full px-2 py-1">
                        <Clock className="w-3 h-3" />
                        <span>⏰ {skill.duration}</span>
                      </div>
                      {skill.rating > 0 && (
                        <div className="flex items-center gap-1 bg-yellow-50 rounded-full px-2 py-1">
                          <Star className="w-3 h-3 fill-current text-yellow-500" />
                          <span>⭐ {skill.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-2 sm:pt-3 border-t border-slate-100">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full text-xs sm:text-sm hover:bg-mint-50 hover:border-mint-300 hover:text-mint-700 transition-all duration-200 hover:scale-105"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        ⚡ Manage Skill
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Motivational Footer */}
      {mySkills.length > 0 && (
        <Card className="border-0 shadow-md bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
              <Heart className="w-4 h-4 text-pink-500 animate-pulse" />
              <span>You have {mySkills.length} amazing skill{mySkills.length !== 1 ? 's' : ''} ready to earn money! Keep it up! 🎉</span>
              <Heart className="w-4 h-4 text-pink-500 animate-pulse" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileSkills;
