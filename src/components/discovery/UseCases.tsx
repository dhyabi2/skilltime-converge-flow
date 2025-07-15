
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

interface UseCasesProps {
  useCases: string[];
  className?: string;
}

const UseCases: React.FC<UseCasesProps> = ({ useCases, className = '' }) => {
  const { t } = useTranslation('discovery');
  const [isExpanded, setIsExpanded] = useState(false);

  if (!useCases || useCases.length === 0) return null;

  return (
    <div className={`bg-white rounded-2xl p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-lg text-gray-800 flex items-center">
          <Target className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 text-purple-600" />
          {t('use_cases.title')}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1 rtl:space-x-reverse text-purple-600 hover:text-purple-700"
        >
          <span className="text-sm">{isExpanded ? t('use_cases.hide') : t('use_cases.show')}</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
      </div>

      {isExpanded && (
        <div className="space-y-3">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 rtl:space-x-reverse p-3 bg-purple-50 rounded-lg"
            >
              <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">
                {index + 1}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{useCase}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UseCases;
