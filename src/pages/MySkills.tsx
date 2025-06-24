
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useMySkills } from '@/hooks/useMySkills';
import SkillCard from '../components/discovery/SkillCard';
import { Button } from '@/components/ui/button';
import SkillCardSkeleton from '@/components/ui/skeletons/SkillCardSkeleton';

const MySkills = () => {
  const { user } = useAuth();
  const { data: skills = [], isLoading, error } = useMySkills();
  const { t } = useTranslation('profile');
  const navigate = useNavigate();

  const handleSkillClick = (id: string) => {
    navigate(`/skill/${id}`);
  };

  const handleAddSkill = () => {
    navigate('/profile');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Please log in to view your skills.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{t('my_skills_title')}</h1>
          <Button size="sm" onClick={handleAddSkill}>
            {t('add_skill')}
          </Button>
        </div>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <SkillCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 space-y-4">
            <p className="text-red-500">Failed to load skills. Please try again.</p>
            <Button onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        ) : skills.length > 0 ? (
          <div className="space-y-4">
            {skills.map(skill => (
              <SkillCard 
                key={skill.id} 
                id={skill.id}
                providerName={skill.providerName}
                skillTitle={skill.skillTitle}
                rating={skill.rating}
                price={skill.price}
                duration={skill.duration}
                location={skill.location}
                image={skill.image}
                isTopRated={skill.isTopRated}
                onClick={() => handleSkillClick(skill.id)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <p className="text-gray-500">{t('no_skills')}</p>
            <p className="text-sm text-gray-400">Start by adding your first skill to share your expertise with others.</p>
            <Button onClick={handleAddSkill}>
              {t('add_skill')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySkills;
