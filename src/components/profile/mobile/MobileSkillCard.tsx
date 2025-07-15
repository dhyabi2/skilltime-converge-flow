
import React, { useState } from 'react';
import { MapPin, Clock, Star, Edit, MoreVertical, Eye, Share } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface MobileSkillCardProps {
  skill: any;
  onEdit?: (skillId: string) => void;
  onShare?: (skill: any) => void;
  onToggleActive?: (skillId: string, isActive: boolean) => void;
}

const MobileSkillCard: React.FC<MobileSkillCardProps> = ({ 
  skill, 
  onEdit,
  onShare,
  onToggleActive
}) => {
  const { t } = useTranslation('profile');
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleView = () => {
    navigate(`/skill/${skill.id}`);
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(skill.id);
    } else {
      navigate(`/skill/${skill.id}`);
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare(skill);
    }
  };

  const handleToggleActive = () => {
    if (onToggleActive) {
      onToggleActive(skill.id, !skill.is_active);
    }
  };

  return (
    <Card className="border border-slate-200 hover:border-mint-300 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white">
      <CardContent className="p-0">
        {/* Image Header */}
        {skill.image_url && !imageError && (
          <div className="relative h-32 overflow-hidden rounded-t-lg">
            <img 
              src={skill.image_url} 
              alt={skill.skillTitle}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            {!skill.is_active && (
              <div className="absolute inset-0 bg-gray-500/50 flex items-center justify-center">
                <Badge variant="secondary" className="bg-gray-700 text-white">
                  Inactive
                </Badge>
              </div>
            )}
          </div>
        )}

        <div className="p-4">
          {/* Header with title and actions */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-800 text-base line-clamp-1 mb-1">
                {skill.skillTitle}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <Badge 
                  variant="secondary" 
                  className="text-xs bg-green-100 text-green-800 hover:bg-green-200"
                >
                  💰 {skill.price} OMR
                </Badge>
                {skill.rating > 0 && (
                  <div className="flex items-center gap-1 bg-yellow-50 rounded-full px-2 py-1">
                    <Star className="w-3 h-3 fill-current text-yellow-500" />
                    <span className="text-xs text-yellow-700">{skill.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleView} className="cursor-pointer">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Skill
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleShare} className="cursor-pointer">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleToggleActive} className="cursor-pointer">
                  {skill.is_active ? '⏸️ Deactivate' : '▶️ Activate'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Description */}
          <p className="text-sm text-slate-600 mb-3 line-clamp-2 leading-relaxed">
            {skill.description}
          </p>
          
          {/* Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <MapPin className="w-3 h-3 text-purple-600" />
              <span className="truncate">{skill.location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-3 h-3 text-green-600" />
              <span>{skill.duration}</span>
            </div>
          </div>

          {/* Expertise Tags */}
          {skill.expertise && skill.expertise.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {skill.expertise.slice(0, 3).map((exp: string, index: number) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                >
                  {exp}
                </Badge>
              ))}
              {skill.expertise.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{skill.expertise.length - 3}
                </Badge>
              )}
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleView}
              className="flex-1 text-xs hover:bg-mint-50 hover:border-mint-300"
            >
              <Eye className="w-3 h-3 mr-1" />
              View
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleEdit}
              className="flex-1 text-xs hover:bg-blue-50"
            >
              <Edit className="w-3 h-3 mr-1" />
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileSkillCard;
