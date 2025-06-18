
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSkill: (skill: string) => Promise<boolean>;
}

const AddSkillModal: React.FC<AddSkillModalProps> = ({
  isOpen,
  onClose,
  onAddSkill
}) => {
  const [skill, setSkill] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation('profile');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skill.trim()) return;

    setIsSubmitting(true);
    const success = await onAddSkill(skill.trim());
    if (success) {
      setSkill('');
      onClose();
    }
    setIsSubmitting(false);
  };

  const handleClose = () => {
    setSkill('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-md mx-auto bg-gradient-to-br from-soft-blue-50 to-mint-50 border-0 shadow-2xl rounded-3xl p-0">
        <div className="relative p-6">
          {/* Header with gradient background */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-mint-500 to-soft-blue-500 rounded-t-3xl opacity-10"></div>
          
          <DialogHeader className="relative z-10 mb-6">
            <DialogTitle className="flex items-center gap-3 text-xl font-bold text-slate-800">
              <div className="p-2 bg-mint-100 rounded-xl">
                <Plus className="h-6 w-6 text-mint-600" />
              </div>
              {t('add_skill_modal.title')}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Section with elegant styling */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-mint-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-mint-600" />
                </div>
                <Label htmlFor="skill" className="font-semibold text-slate-800">
                  {t('add_skill_modal.label')}
                </Label>
              </div>
              
              <Input
                id="skill"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                placeholder="e.g., React Development, UI Design"
                className="h-12 rounded-xl border-slate-200 bg-white/80 backdrop-blur-sm text-slate-800 placeholder:text-slate-500 focus:border-mint-400 focus:ring-mint-400/20 transition-all duration-200"
                autoFocus
              />
              
              {/* Character counter */}
              <div className="mt-2 text-xs text-slate-500 text-right">
                {skill.length}/50 characters
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
              <p className="text-sm font-medium text-slate-700 mb-2">💡 Popular Skills:</p>
              <div className="flex flex-wrap gap-2">
                {['React Development', 'UI/UX Design', 'Photography', 'Writing'].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setSkill(suggestion)}
                    className="px-3 py-1 text-xs bg-white/60 hover:bg-white/80 text-slate-600 rounded-lg border border-slate-200 transition-all duration-200 hover:scale-105"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose}
                className="flex-1 h-12 rounded-xl bg-white/50 hover:bg-white/80 border-slate-200 text-slate-700 font-medium"
              >
                {t('add_skill_modal.cancel')}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !skill.trim()}
                className="flex-1 h-12 rounded-xl bg-gradient-to-r from-mint-500 to-soft-blue-500 hover:from-mint-600 hover:to-soft-blue-600 text-white font-semibold border-0 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {t('add_skill_modal.adding')}
                  </div>
                ) : (
                  t('add_skill_modal.add')
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSkillModal;
