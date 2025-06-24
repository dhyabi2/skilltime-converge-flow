
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, Lightbulb, PenTool, Sparkles } from 'lucide-react';

interface CreateSkillStep1Props {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
}

const CreateSkillStep1: React.FC<CreateSkillStep1Props> = ({
  data,
  onChange,
  onNext
}) => {
  const [charCount, setCharCount] = useState(data.description?.length || 0);
  const [suggestions] = useState([
    "Web Development & Design",
    "Photography & Video Editing", 
    "Language Tutoring",
    "Music Lessons",
    "Fitness Coaching",
    "Digital Marketing"
  ]);

  const handleTitleChange = (value: string) => {
    onChange({ title: value });
  };

  const handleDescriptionChange = (value: string) => {
    onChange({ description: value });
    setCharCount(value.length);
  };

  const canProceed = data.title?.trim() && data.description?.trim();

  return (
    <div className="space-y-6">
      {/* Title Input */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-mint-100 rounded-xl">
              <Sparkles className="w-5 h-5 text-mint-600" />
            </div>
            <div>
              <Label htmlFor="title" className="text-lg font-semibold text-slate-800">
                What's your skill called? ✨
              </Label>
              <p className="text-sm text-slate-600">Make it catchy and descriptive!</p>
            </div>
          </div>
          
          <Input
            id="title"
            value={data.title || ''}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g., Modern Web Development, Portrait Photography..."
            className="h-14 text-lg rounded-xl border-slate-200 bg-white/80 backdrop-blur-sm focus:border-mint-400 focus:ring-mint-400/20 transition-all duration-200"
          />
          
          {/* Character feedback */}
          <div className="mt-2 text-right">
            <span className={`text-xs transition-colors duration-200 ${
              data.title?.length > 5 ? 'text-green-600' : 'text-slate-400'
            }`}>
              {data.title?.length > 5 ? '✓ Perfect!' : 'Keep typing...'}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Description Input */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-soft-blue-100 rounded-xl">
              <PenTool className="w-5 h-5 text-soft-blue-600" />
            </div>
            <div>
              <Label htmlFor="description" className="text-lg font-semibold text-slate-800">
                Tell your story! 📖
              </Label>
              <p className="text-sm text-slate-600">What makes your skill special?</p>
            </div>
          </div>
          
          <Textarea
            id="description"
            value={data.description || ''}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            placeholder="Share your passion! What will people learn? What's your experience? Make it personal and exciting..."
            rows={5}
            className="text-base rounded-xl border-slate-200 bg-white/80 backdrop-blur-sm focus:border-soft-blue-400 focus:ring-soft-blue-400/20 transition-all duration-200 resize-none"
          />
          
          {/* Character counter with encouragement */}
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-2">
              {charCount > 50 && (
                <span className="text-xs text-green-600 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Looking great!
                </span>
              )}
            </div>
            <span className={`text-xs transition-colors duration-200 ${
              charCount > 100 ? 'text-green-600' : charCount > 50 ? 'text-orange-500' : 'text-slate-400'
            }`}>
              {charCount}/500 characters
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Suggestions */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-purple-800">💡 Need inspiration?</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleTitleChange(suggestion)}
                className="p-3 text-left bg-white/60 hover:bg-white/80 rounded-xl border border-purple-200 text-sm text-purple-700 hover:text-purple-800 transition-all duration-200 hover:scale-105"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Button */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className={`h-12 px-8 rounded-xl font-semibold transition-all duration-300 ${
            canProceed
              ? 'bg-gradient-to-r from-mint-500 to-soft-blue-500 hover:from-mint-600 hover:to-soft-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Continue the Magic</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default CreateSkillStep1;
