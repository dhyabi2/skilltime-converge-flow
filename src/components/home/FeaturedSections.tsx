
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import SkillCard from '../discovery/SkillCard';
import { skillsAPI } from '../../services';

const FeaturedSections = () => {
  const { t } = useTranslation('skills');
  const [activeSection, setActiveSection] = useState('top_rated');
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  const sections = [
    { key: 'top_rated', label: t('sections.top_rated') },
    { key: 'first_published', label: t('sections.first_published') },
    { key: 'top_week', label: t('sections.top_week') },
    { key: 'most_exchanges', label: t('sections.most_exchanges') }
  ];

  useEffect(() => {
    fetchSkillsForSection(activeSection);
  }, [activeSection]);

  const fetchSkillsForSection = async (sectionKey: string) => {
    setLoading(true);
    try {
      let skillsData = [];
      switch (sectionKey) {
        case 'top_rated':
          skillsData = await skillsAPI.getTopRated();
          break;
        case 'first_published':
          skillsData = await skillsAPI.getFirstPublished();
          break;
        case 'top_week':
          skillsData = await skillsAPI.getTopThisWeek();
          break;
        case 'most_exchanges':
          skillsData = await skillsAPI.getMostExchanges();
          break;
        default:
          skillsData = await skillsAPI.getTopRated();
      }
      setSkills(skillsData);
      
      // Animate skills when they load
      if (skillsRef.current) {
        gsap.fromTo(skillsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1
          }
        );
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionChange = (sectionKey: string) => {
    setActiveSection(sectionKey);
  };

  const handleSkillClick = (skillId: string) => {
    console.log('Navigate to skill:', skillId);
    // Navigation will be handled by parent component
  };

  return (
    <section className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-lg">
      <h3 className="text-2xl font-bold text-slate-800 mb-6 font-cairo">
        {t('discovery.featured_sections')}
      </h3>
      
      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map((section) => (
          <button
            key={section.key}
            onClick={() => handleSectionChange(section.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 font-cairo ${
              activeSection === section.key
                ? 'bg-gradient-to-r from-soft-blue-500 to-mint-500 text-white shadow-md'
                : 'bg-white/50 text-slate-700 hover:bg-white/70'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Skills Content */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-soft-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600 font-cairo">{t('status.loading')}</p>
        </div>
      ) : (
        <div ref={skillsRef} className="space-y-4">
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              {...skill}
              onClick={() => handleSkillClick(skill.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedSections;
