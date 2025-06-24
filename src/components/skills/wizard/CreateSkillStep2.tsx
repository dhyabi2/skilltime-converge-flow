
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, DollarSign, Clock, MapPin, TrendingUp } from 'lucide-react';

interface CreateSkillStep2Props {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const CreateSkillStep2: React.FC<CreateSkillStep2Props> = ({
  data,
  onChange,
  onNext,
  onBack
}) => {
  const canProceed = data.price && data.duration && data.location;

  const priceRanges = [
    { range: "5-15 OMR", desc: "Perfect for beginners", icon: "🌱" },
    { range: "15-30 OMR", desc: "Most popular range", icon: "⭐" },
    { range: "30-50 OMR", desc: "Premium expertise", icon: "💎" },
    { range: "50+ OMR", desc: "Elite mastery", icon: "👑" }
  ];

  return (
    <div className="space-y-6">
      {/* Pricing Section */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-xl">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <Label className="text-lg font-semibold text-slate-800">
                What's your skill worth? 💰
              </Label>
              <p className="text-sm text-slate-600">Price it right to attract more students!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={data.price || ''}
                onChange={(e) => onChange({ price: e.target.value })}
                placeholder="25.00"
                className="h-14 text-xl text-center rounded-xl border-slate-200 bg-white/80 backdrop-blur-sm focus:border-green-400 focus:ring-green-400/20"
              />
              <p className="text-center text-sm text-slate-600 mt-2">OMR per session</p>
            </div>

            <div className="space-y-3">
              {priceRanges.map((range, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-slate-100">
                  <span className="text-lg">{range.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-slate-800">{range.range}</div>
                    <div className="text-xs text-slate-600">{range.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Duration & Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Duration */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <Label className="text-lg font-semibold text-slate-800">
                  Session Length ⏰
                </Label>
                <p className="text-sm text-slate-600">How long per session?</p>
              </div>
            </div>
            
            <Select
              value={data.duration}
              onValueChange={(value) => onChange({ duration: value })}
            >
              <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-white/80 backdrop-blur-sm">
                <SelectValue placeholder="Choose duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30 minutes">⚡ 30 minutes - Quick & focused</SelectItem>
                <SelectItem value="1 hour">⭐ 1 hour - Most popular</SelectItem>
                <SelectItem value="2 hours">🔥 2 hours - Deep dive</SelectItem>
                <SelectItem value="Half day">💪 Half day - Intensive</SelectItem>
                <SelectItem value="Full day">🚀 Full day - Complete mastery</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-xl">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <Label className="text-lg font-semibold text-slate-800">
                  Where to meet? 📍
                </Label>
                <p className="text-sm text-slate-600">Online or in-person?</p>
              </div>
            </div>
            
            <Select
              value={data.location}
              onValueChange={(value) => onChange({ location: value })}
            >
              <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-white/80 backdrop-blur-sm">
                <SelectValue placeholder="Choose location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Remote">🌐 Remote - Online sessions</SelectItem>
                <SelectItem value="Muscat">🏙️ Muscat - Capital vibes</SelectItem>
                <SelectItem value="Salalah">🌴 Salalah - Southern charm</SelectItem>
                <SelectItem value="Nizwa">🏰 Nizwa - Historic beauty</SelectItem>
                <SelectItem value="Sur">🏖️ Sur - Coastal magic</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Market Insight */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-amber-800">📊 Market Insight</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/60 rounded-xl">
              <div className="text-2xl font-bold text-amber-700">67%</div>
              <div className="text-sm text-amber-600">Prefer 1-hour sessions</div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-xl">
              <div className="text-2xl font-bold text-amber-700">15-30</div>
              <div className="text-sm text-amber-600">OMR sweet spot</div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-xl">
              <div className="text-2xl font-bold text-amber-700">82%</div>
              <div className="text-sm text-amber-600">Love remote learning</div>
            </div>
          </div>
        </CardContent>
      </Card>

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
          <span>Perfect! Next Step</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default CreateSkillStep2;
