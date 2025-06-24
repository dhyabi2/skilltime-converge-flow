
import React from 'react';
import { Target, Zap, Trophy } from 'lucide-react';

const CreateSkillStatsBanner = () => {
  return (
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
  );
};

export default CreateSkillStatsBanner;
