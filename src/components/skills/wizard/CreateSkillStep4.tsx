
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Plus, X, Target, Lightbulb, Zap } from 'lucide-react';

interface CreateSkillStep4Props {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const CreateSkillStep4: React.FC<CreateSkillStep4Props> = ({
  data,
  onChange,
  onNext,
  onBack
}) => {
  const [expertiseInput, setExpertiseInput] = useState('');
  const [useCasesInput, setUseCasesInput] = useState('');

  const expertise = data.expertise || [];
  const useCases = data.useCases || [];

  const addExpertise = () => {
    const trimmed = expertiseInput.trim();
    if (trimmed && !expertise.includes(trimmed)) {
      onChange({ expertise: [...expertise, trimmed] });
      setExpertiseInput('');
    }
  };

  const removeExpertise = (index: number) => {
    onChange({ expertise: expertise.filter((_: any, i: number) => i !== index) });
  };

  const addUseCase = () => {
    const trimmed = useCasesInput.trim();
    if (trimmed && !useCases.includes(trimmed)) {
      onChange({ useCases: [...useCases, trimmed] });
      setUseCasesInput('');
    }
  };

  const removeUseCase = (index: number) => {
    onChange({ useCases: useCases.filter((_: any, i: number) => i !== index) });
  };

  const expertiseSuggestions = [
    "React", "JavaScript", "Python", "UI/UX Design", "Photography", 
    "Video Editing", "Content Writing", "SEO", "Digital Marketing", "Teaching"
  ];

  const useCaseSuggestions = [
    "Build a modern website", "Create a mobile app", "Design a logo", 
    "Learn a new language", "Improve fitness", "Start a business", 
    "Master a skill", "Create content", "Boost productivity"
  ];

  const canProceed = expertise.length > 0 || useCases.length > 0;

  return (
    <div className="space-y-6">
      {/* Expertise Section */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-100 rounded-xl">
              <Target className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <Label className="text-lg font-semibold text-slate-800">
                Your Superpowers 🎯
              </Label>
              <p className="text-sm text-slate-600">What technologies, tools, or skills do you master?</p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <Input
              value={expertiseInput}
              onChange={(e) => setExpertiseInput(e.target.value)}
              placeholder="e.g., React, JavaScript, Photoshop..."
              className="h-12 rounded-xl border-slate-200 bg-white/80 backdrop-blur-sm focus:border-orange-400 focus:ring-orange-400/20"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExpertise())}
            />
            <Button 
              type="button" 
              onClick={addExpertise}
              className="h-12 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          {/* Expertise Tags */}
          {expertise.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {expertise.map((item: string, index: number) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-2 px-3 py-2 bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors">
                  {item}
                  <button
                    onClick={() => removeExpertise(index)}
                    className="hover:bg-orange-300 rounded-full p-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Expertise Suggestions */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-orange-500" />
              Quick add:
            </p>
            <div className="flex flex-wrap gap-2">
              {expertiseSuggestions.filter(s => !expertise.includes(s)).slice(0, 6).map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    onChange({ expertise: [...expertise, suggestion] });
                  }}
                  className="px-3 py-1 text-xs bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg border border-orange-200 transition-all duration-200 hover:scale-105"
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Use Cases Section */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-xl">
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <Label className="text-lg font-semibold text-slate-800">
                Real-World Magic ⚡
              </Label>
              <p className="text-sm text-slate-600">What amazing things can people achieve with your help?</p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <Input
              value={useCasesInput}
              onChange={(e) => setUseCasesInput(e.target.value)}
              placeholder="e.g., Build a stunning portfolio website..."
              className="h-12 rounded-xl border-slate-200 bg-white/80 backdrop-blur-sm focus:border-purple-400 focus:ring-purple-400/20"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addUseCase())}
            />
            <Button 
              type="button" 
              onClick={addUseCase}
              className="h-12 px-4 rounded-xl bg-purple-500 hover:bg-purple-600 text-white"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          {/* Use Cases Tags */}
          {useCases.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {useCases.map((item: string, index: number) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors">
                  {item}
                  <button
                    onClick={() => removeUseCase(index)}
                    className="hover:bg-purple-300 rounded-full p-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Use Cases Suggestions */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-purple-500" />
              Popular outcomes:
            </p>
            <div className="flex flex-wrap gap-2">
              {useCaseSuggestions.filter(s => !useCases.includes(s)).slice(0, 6).map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    onChange({ useCases: [...useCases, suggestion] });
                  }}
                  className="px-3 py-1 text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg border border-purple-200 transition-all duration-200 hover:scale-105"
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motivation Card */}
      {!canProceed && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="font-semibold text-blue-800 mb-2">Show off your expertise!</h3>
            <p className="text-blue-600 text-sm">
              Add at least one expertise area or use case to help people understand what you can do for them.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="h-12 px-6 rounded-xl border-slate-300 hover:bg-slate-50"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className={`h-12 px-8 rounded-xl font-semibold transition-all duration-300 ${
            canProceed
              ? 'bg-gradient-to-r from-mint-500 to-soft-blue-500 hover:from-mint-600 hover:to-soft-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Looking Amazing!</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default CreateSkillStep4;
