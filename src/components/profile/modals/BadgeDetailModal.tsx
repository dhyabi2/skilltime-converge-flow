
import React from 'react';
import { Award, Calendar, Target, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface BadgeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: string[];
}

const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({
  isOpen,
  onClose,
  badges
}) => {
  const { t } = useTranslation('profile');

  const badgeDetails = [
    {
      name: 'Early Adopter',
      description: 'One of the first users to join the platform',
      earned: badges.includes('Early Adopter'),
      progress: 100,
      target: 1,
      icon: '🚀',
      earnedDate: '2024-01-15'
    },
    {
      name: 'Skill Master',
      description: 'Added 5 or more skills to your profile',
      earned: badges.includes('Skill Master'),
      progress: badges.length >= 3 ? Math.min((badges.length / 5) * 100, 100) : 40,
      target: 5,
      icon: '🎯',
      earnedDate: badges.includes('Skill Master') ? '2024-02-20' : null
    },
    {
      name: 'Helpful Reviewer',
      description: 'Received 10 helpful votes on your reviews',
      earned: badges.includes('Helpful Reviewer'),
      progress: 60,
      target: 10,
      icon: '⭐',
      earnedDate: badges.includes('Helpful Reviewer') ? '2024-03-10' : null
    },
    {
      name: 'Top Rated',
      description: 'Maintained a 4.8+ star rating with 10+ reviews',
      earned: badges.includes('Top Rated'),
      progress: 30,
      target: 10,
      icon: '🏆',
      earnedDate: badges.includes('Top Rated') ? '2024-04-05' : null
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Badge Collection
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center py-4">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {badges.length}
            </div>
            <p className="text-gray-600">Badges Earned</p>
          </div>

          <div className="space-y-4">
            {badgeDetails.map((badge, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  badge.earned 
                    ? 'border-purple-200 bg-purple-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`text-3xl p-2 rounded-full ${
                    badge.earned ? 'bg-purple-100' : 'bg-gray-100 grayscale'
                  }`}>
                    {badge.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-semibold ${
                        badge.earned ? 'text-purple-800' : 'text-gray-600'
                      }`}>
                        {badge.name}
                      </h3>
                      {badge.earned && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Earned
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">
                      {badge.description}
                    </p>
                    
                    {!badge.earned && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            Progress
                          </span>
                          <span className="text-gray-500">
                            {Math.round(badge.progress)}% complete
                          </span>
                        </div>
                        <Progress value={badge.progress} className="h-2" />
                      </div>
                    )}
                    
                    {badge.earned && badge.earnedDate && (
                      <div className="flex items-center gap-1 text-sm text-purple-600">
                        <Calendar className="w-3 h-3" />
                        Earned on {new Date(badge.earnedDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BadgeDetailModal;
