
import React, { useState } from 'react';
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Skill</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="skill">Skill Name</Label>
            <Input 
              id="skill"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="e.g., React Development, UI Design"
              className="mt-1"
              autoFocus
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !skill.trim()}
              className="bg-soft-blue-600 hover:bg-soft-blue-700"
            >
              {isSubmitting ? 'Adding...' : 'Add Skill'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSkillModal;
