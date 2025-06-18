import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { skillsAPI } from '../services';
import SkillCard from '../components/discovery/SkillCard';
import { Button } from '@/components/ui/button';

const MySkills = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation('profile');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchSkills();
    }
  }, [user]);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const name = user?.user_metadata?.full_name || user?.email || '';
      const data = await skillsAPI.getByProvider(name);
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkillClick = (id: string) => {
    navigate(`/skill/${id}`);
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">{t('coming_soon')}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{t('my_skills_title')}</h1>
          <Button size="sm" onClick={() => navigate('/profile')}>{t('add_skill')}</Button>
        </div>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : skills.length > 0 ? (
          <div className="space-y-4">
            {skills.map(skill => (
              <SkillCard key={skill.id} {...skill} onClick={() => handleSkillClick(skill.id)} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">{t('no_skills')}</p>
        )}
      </div>
    </div>
  );
};

export default MySkills;
