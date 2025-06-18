
import React from 'react';
import { useTranslation } from 'react-i18next';
import SkillCard from './SkillCard';

interface SkillResultsProps {
  skills: any[];
  searchQuery: string;
  selectedCategory: string;
  selectedSubcategory: string;
  onSkillClick: (skillId: string) => void;
}

const SkillResults: React.FC<SkillResultsProps> = ({
  skills,
  searchQuery,
  selectedCategory,
  selectedSubcategory,
  onSkillClick
}) => {
  const { t } = useTranslation('skills');

  const getResultsTitle = () => {
    if (searchQuery) return `${t('discovery.search_results')} "${searchQuery}"`;
    if (selectedSubcategory) return t(`subcategories.${selectedSubcategory}`);
    if (selectedCategory) return t(`categories.${selectedCategory}`);
    return t('discovery.all_skills');
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800">
          {getResultsTitle()}
        </h3>
        <span className="text-sm text-slate-600">
          {skills.length} {t('status.skills_found')}
        </span>
      </div>
      
      {skills.length > 0 ? (
        <div className="space-y-4">
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              {...skill}
              onClick={() => onSkillClick(skill.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h4 className="text-lg font-semibold text-slate-800 mb-2">{t('status.not_found')}</h4>
          <p className="text-slate-600">
            {t('status.not_found_desc')}
          </p>
        </div>
      )}
    </section>
  );
};

export default SkillResults;
