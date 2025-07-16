
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Check, Sparkles, Wand2, Target, Clock, MapPin, Tag, Star, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CreateSkillStep1 from './wizard/CreateSkillStep1';
import CreateSkillStep2 from './wizard/CreateSkillStep2';
import CreateSkillStep3 from './wizard/CreateSkillStep3';
import CreateSkillStep4 from './wizard/CreateSkillStep4';
import CreateSkillStep5 from './wizard/CreateSkillStep5';
import CreateSkillPreview from './wizard/CreateSkillPreview';

interface CreateSkillWizardProps {
  initialData: any;
  categories: any[];
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
}

const CreateSkillWizard: React.FC<CreateSkillWizardProps> = ({
  initialData,
  categories,
  onSubmit,
  isSubmitting
}) => {
  const { t } = useTranslation('create-skill');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialData);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const steps = [
    { 
      id: 1, 
      title: "What's Your Superpower?", 
      subtitle: "Tell us about your amazing skill",
      icon: Sparkles,
      color: "from-mint-500 to-soft-blue-500",
      emoji: "✨"
    },
    { 
      id: 2, 
      title: "Show Me the Magic", 
      subtitle: "Set your price and logistics",
      icon: Wand2,
      color: "from-soft-blue-500 to-purple-500",
      emoji: "💰"
    },
    { 
      id: 3, 
      title: "Pick Your Category", 
      subtitle: "Help people find you easily",
      icon: Tag,
      color: "from-purple-500 to-pink-500",
      emoji: "🏷️"
    },
    { 
      id: 4, 
      title: "Your Expertise", 
      subtitle: "What makes you special?",
      icon: Target,
      color: "from-pink-500 to-red-500",
      emoji: "🎯"
    },
    { 
      id: 5, 
      title: "When Are You Free?", 
      subtitle: "Set your availability",
      icon: Clock,
      color: "from-red-500 to-orange-500",
      emoji: "⏰"
    }
  ];

  const progress = (currentStep / steps.length) * 100;

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep]);
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleSubmit = async () => {
    await onSubmit(formData);
  };

  const currentStepData = steps[currentStep - 1];
  const StepIcon = currentStepData.icon;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CreateSkillStep1
            data={formData}
            onChange={updateFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <CreateSkillStep2
            data={formData}
            onChange={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <CreateSkillStep3
            data={formData}
            categories={categories}
            onChange={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <CreateSkillStep4
            data={formData}
            onChange={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <CreateSkillStep5
            data={formData}
            onChange={updateFormData}
            onPreview={handlePreview}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  if (showPreview) {
    return (
      <CreateSkillPreview
        data={formData}
        onBack={() => setShowPreview(false)}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <Card className="mb-8 bg-white/60 backdrop-blur-sm border-0 shadow-xl">
        <CardContent className="p-6">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  relative flex items-center justify-center w-12 h-12 rounded-full text-white text-sm font-bold transition-all duration-300
                  ${currentStep >= step.id 
                    ? `bg-gradient-to-r ${step.color} shadow-lg scale-110` 
                    : 'bg-gray-200 text-gray-500'
                  }
                  ${completedSteps.includes(step.id) ? 'animate-pulse' : ''}
                `}>
                  {completedSteps.includes(step.id) ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span className="text-lg">{step.emoji}</span>
                  )}
                  
                  {completedSteps.includes(step.id) && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-2 h-2 text-white" />
                    </div>
                  )}
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`
                    w-16 h-1 mx-2 rounded-full transition-all duration-300
                    ${currentStep > step.id ? 'bg-gradient-to-r from-mint-400 to-soft-blue-400' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
          
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">{t('wizard.progress_text')}</span>
              <span className="font-medium text-slate-800">{t('wizard.percent_complete', { percent: Math.round(progress) })}</span>
            </div>
            <Progress value={progress} className="h-3 bg-gray-200">
              <div 
                className="h-full bg-gradient-to-r from-mint-400 to-soft-blue-500 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </Progress>
          </div>
        </CardContent>
      </Card>

      {/* Step Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className={`p-3 rounded-2xl bg-gradient-to-r ${currentStepData.color} text-white shadow-lg`}>
            <StepIcon className="w-8 h-8" />
          </div>
          <div className="text-left">
            <h2 className="text-3xl font-bold text-slate-800">{currentStepData.title}</h2>
            <p className="text-slate-600">{currentStepData.subtitle}</p>
          </div>
        </div>
        
        {/* Motivational message */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-white/50">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="text-sm text-slate-700">{t('wizard.motivational_message')}</span>
        </div>
      </div>

      {/* Step Content */}
      <div className="animate-fade-in">
        {renderStep()}
      </div>
    </div>
  );
};

export default CreateSkillWizard;
