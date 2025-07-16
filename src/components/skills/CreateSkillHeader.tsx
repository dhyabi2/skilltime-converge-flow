
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CreateSkillHeaderProps {
  userName?: string;
  onBack: () => void;
}

const CreateSkillHeader: React.FC<CreateSkillHeaderProps> = ({ userName, onBack }) => {
  const { t } = useTranslation('create-skill');
  
  return (
    <div className="flex items-center gap-4 mb-8">
      <Button
        variant="ghost"
        size="icon"
        onClick={onBack}
        className="hover:bg-white/50 backdrop-blur-sm transition-all duration-200"
        aria-label={t('header.back_button')}
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-mint-500 animate-pulse" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-mint-600 to-soft-blue-600 bg-clip-text text-transparent">
            {t('header.title')}
          </h1>
        </div>
        <p className="text-slate-600 flex items-center gap-2">
          <span>{t('header.subtitle', { userName: userName || 'there' })}</span>
          <Heart className="w-4 h-4 text-red-400 animate-pulse" />
        </p>
      </div>
    </div>
  );
};

export default CreateSkillHeader;
