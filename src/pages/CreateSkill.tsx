
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCreateMySkill } from '@/hooks/useMySkills';
import { useCategories } from '@/hooks/useCategories';
import { skillAvailabilityService } from '@/services/supabase/skillAvailability';
import CreateSkillWizard from '@/components/skills/CreateSkillWizard';
import CreateSkillHeader from '@/components/skills/CreateSkillHeader';
import CreateSkillStatsBanner from '@/components/skills/CreateSkillStatsBanner';
import CreateSkillBackground from '@/components/skills/CreateSkillBackground';
import ConfettiOverlay from '@/components/skills/ConfettiOverlay';
import { useAuth } from '@/contexts/AuthContext';

interface TimeSlot {
  day_of_week: number;
  start_time: string;
  end_time: string;
}

const CreateSkill = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation('create-skill');
  const createSkill = useCreateMySkill();
  const { data: categories = [] } = useCategories();
  const [showConfetti, setShowConfetti] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '1 hour',
    location: 'Remote',
    category_id: '',
    image_url: '/placeholder.svg'
  });

  const [expertise, setExpertise] = useState<string[]>([]);
  const [useCases, setUseCases] = useState<string[]>([]);
  const [availability, setAvailability] = useState<TimeSlot[]>([]);

  const handleSubmit = async (finalData: any) => {
    try {
      const skillData = {
        ...finalData,
        price: parseFloat(finalData.price) || 0,
        expertise: finalData.expertise,
        use_cases: finalData.useCases,
      };

      const createdSkill = await createSkill.mutateAsync(skillData);
      
      if (finalData.availability.length > 0 && createdSkill?.id) {
        const availabilityData = finalData.availability.map((slot: TimeSlot) => ({
          skill_id: createdSkill.id,
          day_of_week: slot.day_of_week,
          start_time: slot.start_time,
          end_time: slot.end_time,
        }));
        
        await skillAvailabilityService.createMultiple(availabilityData);
      }
      
      setShowConfetti(true);
      setTimeout(() => {
        navigate('/my-skills');
      }, 3000);
    } catch (error: any) {
      console.error('Failed to create skill:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-mint-50 to-purple-50 relative overflow-hidden">
      <CreateSkillBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6">
        <CreateSkillHeader 
          userName={user?.email?.split('@')[0] || 'there'}
          onBack={() => navigate('/profile')}
        />
        
        <CreateSkillStatsBanner />

        <CreateSkillWizard
          initialData={{
            ...formData,
            expertise,
            useCases,
            availability
          }}
          categories={categories}
          onSubmit={handleSubmit}
          isSubmitting={createSkill.isPending}
        />
      </div>

      <ConfettiOverlay show={showConfetti} />
    </div>
  );
};

export default CreateSkill;
