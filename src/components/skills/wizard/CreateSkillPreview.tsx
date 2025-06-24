
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Star, MapPin, Clock, DollarSign, Target, Zap, Calendar, Sparkles } from 'lucide-react';

interface CreateSkillPreviewProps {
  data: any;
  onBack: () => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

const CreateSkillPreview: React.FC<CreateSkillPreviewProps> = ({
  data,
  onBack,
  onSubmit,
  isSubmitting
}) => {
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Preview Header */}
      <Card className="bg-gradient-to-r from-mint-50 to-soft-blue-50 border-mint-200 shadow-xl">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-mint-500 rounded-2xl text-white">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Almost There! 🎉</h2>
              <p className="text-slate-600">Here's how your skill will appear to students</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skill Preview Card */}
      <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden">
        <div className="relative h-48 bg-gradient-to-br from-mint-400 via-soft-blue-400 to-purple-400">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="text-white">
                <div className="font-medium">You</div>
                <div className="text-sm opacity-90">Skill Provider</div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{data.title}</h1>
            <div className="flex items-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                <span>New</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{data.location}</span>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Price & Duration */}
          <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-xl">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-700">{data.price} OMR</div>
                <div className="text-sm text-green-600">per session</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Clock className="w-4 h-4" />
              <span>{data.duration}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-slate-800 mb-3">About This Skill</h3>
            <p className="text-slate-600 leading-relaxed">{data.description}</p>
          </div>

          {/* Expertise */}
          {data.expertise && data.expertise.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-500" />
                Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.expertise.map((item: string, index: number) => (
                  <Badge key={index} className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Use Cases */}
          {data.useCases && data.useCases.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-500" />
                What You'll Achieve
              </h3>
              <div className="space-y-2">
                {data.useCases.map((useCase: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 text-slate-600">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Availability */}
          {data.availability && data.availability.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Available Times
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.availability.map((slot: any, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-blue-600 font-medium">
                      {DAYS[slot.day_of_week]}
                    </div>
                    <div className="text-slate-600 text-sm">
                      {slot.start_time} - {slot.end_time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between pt-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="h-12 px-6 rounded-xl border-slate-300 hover:bg-slate-50"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Make Changes
        </Button>
        
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="h-14 px-8 rounded-xl font-semibold bg-gradient-to-r from-mint-500 to-soft-blue-500 hover:from-mint-600 hover:to-soft-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Creating Magic...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Save className="w-5 h-5" />
              <span>Publish My Skill! 🚀</span>
            </div>
          )}
        </Button>
      </div>

      {/* Encouragement */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-lg">
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-3">🌟</div>
          <h3 className="font-semibold text-orange-800 mb-2">You're About to Inspire Someone!</h3>
          <p className="text-orange-600 text-sm">
            Your skill could be exactly what someone needs to achieve their dreams. Ready to make an impact?
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateSkillPreview;
