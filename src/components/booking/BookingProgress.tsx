
import React from 'react';
import { Check, Clock, CreditCard, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BookingProgressProps {
  currentStep: number;
  steps: string[];
}

const BookingProgress: React.FC<BookingProgressProps> = ({ currentStep, steps }) => {
  const { t } = useTranslation('bookings');

  const getStepIcon = (stepIndex: number) => {
    switch (stepIndex) {
      case 0: return Calendar;
      case 1: return Clock;
      case 2: return CreditCard;
      default: return Check;
    }
  };

  return (
    <div className="flex items-center justify-between max-w-md mx-auto mb-6">
      {steps.map((step, index) => {
        const Icon = getStepIcon(index);
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        
        return (
          <div key={index} className="flex items-center">
            {/* Step Circle */}
            <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
              isCompleted 
                ? 'bg-green-500 border-green-500 text-white' 
                : isActive 
                ? 'bg-soft-blue-500 border-soft-blue-500 text-white' 
                : 'bg-white border-gray-300 text-gray-400'
            }`}>
              {isCompleted ? (
                <Check className="w-5 h-5" />
              ) : (
                <Icon className="w-4 h-4" />
              )}
              
              {/* Active Step Animation */}
              {isActive && (
                <div className="absolute -inset-1 bg-soft-blue-500/20 rounded-full animate-pulse" />
              )}
            </div>

            {/* Step Label */}
            <div className={`ml-2 text-xs font-medium transition-colors duration-300 ${
              isActive ? 'text-soft-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
            }`}>
              {t(`steps.${step}`)}
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-3 transition-colors duration-300 ${
                index < currentStep ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BookingProgress;
