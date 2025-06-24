
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateMySkill } from '@/hooks/useMySkills';
import { useCategories } from '@/hooks/useCategories';
import { skillAvailabilityService } from '@/services/supabase/skillAvailability';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Sparkles, Trophy, Target, Zap, Heart, Star } from 'lucide-react';
import CreateSkillWizard from '@/components/skills/CreateSkillWizard';
import { useAuth } from '@/contexts/AuthContext';

interface TimeSlot {
  day_of_week: number;
  start_time: string;
  end_time: string;
}

const CreateSkill = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const createSkill = useCreateMySkill();
  const { data: categories = [] } = useCategories();
  const [showConfetti, setShowConfetti] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '1 hour',
    location: 'Remote',
    category_id: '',
    image_url: '/placeholder.svg'
  });

  const [expertise, setExpertise] = useState<string[]>([]);
  const [useCases, setUseCases] = useState<string[]>([]);
  const [availability, setAvailability] = useState<TimeSlot[]>([]);

  const handleSubmit = async (finalData: any) => {
    try {
      const skillData = {
        ...finalData,
        price: parseFloat(finalData.price) || 0,
        expertise: finalData.expertise,
        use_cases: finalData.useCases,
      };

      const createdSkill = await createSkill.mutateAsync(skillData);
      
      if (finalData.availability.length > 0 && createdSkill?.id) {
        const availabilityData = finalData.availability.map((slot: TimeSlot) => ({
          skill_id: createdSkill.id,
          day_of_week: slot.day_of_week,
          start_time: slot.start_time,
          end_time: slot.end_time,
        }));
        
        await skillAvailabilityService.createMultiple(availabilityData);
      }
      
      setShowConfetti(true);
      setTimeout(() => {
        navigate('/my-skills');
      }, 3000);
    } catch (error: any) {
      console.error('Failed to create skill:', error);
    }
  };

  // Confetti effect component
  const ConfettiOverlay = () => {
    if (!showConfetti) return null;
    
    return (
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center animate-scale-in">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-white mb-2">Congratulations!</h2>
            <p className="text-xl text-white/90">Your skill has been created successfully!</p>
            <div className="flex justify-center gap-2 mt-4">
              <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
              <Trophy className="w-6 h-6 text-yellow-400 animate-bounce" />
              <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
          </div>
        </div>
        {/* Floating confetti elements */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 bg-gradient-to-r from-mint-400 to-soft-blue-400 rounded-full animate-ping`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-mint-50 to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-mint-400 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-soft-blue-400 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-400 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-1/3 w-12 h-12 bg-pink-400 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6">
        {/* Header with personality */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/profile')}
            className="hover:bg-white/50 backdrop-blur-sm transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-mint-500 animate-pulse" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-mint-600 to-soft-blue-600 bg-clip-text text-transparent">
                Share Your Magic ✨
              </h1>
            </div>
            <p className="text-slate-600 flex items-center gap-2">
              <span>Hey {user?.name || 'there'}! Ready to inspire the world with your skills?</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            </p>
          </div>
        </div>

        {/* Fun stats banner */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 mb-8 border border-white/50 shadow-lg">
          <div className="flex items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-mint-100 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-mint-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">47</div>
                <div className="text-xs text-slate-600">Skills created today</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-soft-blue-100 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-soft-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">2.3k</div>
                <div className="text-xs text-slate-600">People inspired</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">You</div>
                <div className="text-xs text-slate-600">Next success story</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wizard Component */}
        <CreateSkillWizard
          initialData={{
            ...formData,
            expertise,
            useCases,
            availability
          }}
          categories={categories}
          onSubmit={handleSubmit}
          isSubmitting={createSkill.isPending}
        />
      </div>

      <ConfettiOverlay />
    </div>
  );
};

export default CreateSkill;
