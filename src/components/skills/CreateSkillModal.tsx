
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

interface CreateSkillModalProps {
  trigger?: React.ReactNode;
}

const CreateSkillModal: React.FC<CreateSkillModalProps> = ({ trigger }) => {
  const navigate = useNavigate();

  const handleCreateSkill = () => {
    navigate('/create-skill');
  };

  const defaultTrigger = (
    <Button size="sm" onClick={handleCreateSkill}>
      <Plus className="w-4 h-4 mr-1" />
      Add Skill
    </Button>
  );

  return trigger ? (
    <div onClick={handleCreateSkill}>
      {trigger}
    </div>
  ) : defaultTrigger;
};

export default CreateSkillModal;
