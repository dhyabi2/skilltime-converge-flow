
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Tag, Sparkles, TrendingUp } from 'lucide-react';

interface CreateSkillStep3Props {
  data: any;
  categories: any[];
  onChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const CreateSkillStep3: React.FC<CreateSkillStep3Props> = ({
  data,
  categories,
  onChange,
  onNext,
  onBack
}) => {
  const canProceed = data.category_id;

  const categoryIcons: { [key: string]: string } = {
    'Development': '💻',
    'Design': '🎨',
    'Marketing': '📢',
    'Writing': '✍️',
    'Photography': '📸',
    'Music': '🎵',
    'Fitness': '💪',
    'Language': '🗣️',
    'Business': '💼',
    'Education': '📚'
  };

  const popularCategories = categories
    .sort((a, b) => (b.skill_count || 0) - (a.skill_count || 0))
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Category Selection Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-xl">
              <Tag className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <Label className="text-lg font-semibold text-purple-800">
                Where do you belong? 🏷️
              </Label>
              <p className="text-sm text-purple-600">Choose the perfect category for your skill</p>
            </div>
          </div>
          
          {popularCategories.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-purple-700">
              <TrendingUp className="w-4 h-4" />
              <span>Most popular: {popularCategories.map(cat => cat.title).join(', ')}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const isSelected = data.category_id === category.id;
          const icon = categoryIcons[category.title] || categoryIcons[category.icon_type] || '🎯';
          const isPopular = popularCategories.some(pop => pop.id === category.id);
          
          return (
            <Card 
              key={category.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl relative ${
                isSelected 
                  ? 'ring-2 ring-mint-400 bg-gradient-to-br from-mint-50 to-soft-blue-50 shadow-lg' 
                  : 'bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:bg-white/90'
              }`}
              onClick={() => onChange({ category_id: category.id })}
            >
              {isPopular && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs px-2 py-1 rounded-full shadow-lg z-10">
                  🔥 Hot
                </div>
              )}
              
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-semibold text-slate-800 mb-2">{category.title}</h3>
                <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                  <span>{category.skill_count || 0} skills</span>
                  {isSelected && (
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-mint-500" />
                      <span className="text-mint-600 font-medium">Selected!</span>
                    </div>
                  )}
                </div>
                
                {/* Selection indicator */}
                {isSelected && (
                  <div className="mt-3 w-8 h-8 bg-mint-400 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Help Text */}
      {!data.category_id && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-3">🤔</div>
            <h3 className="font-semibold text-blue-800 mb-2">Not sure which category?</h3>
            <p className="text-blue-600 text-sm">
              Think about what people would search for when looking for your skill. 
              You can always change this later!
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
          <span>Great Choice!</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default CreateSkillStep3;
