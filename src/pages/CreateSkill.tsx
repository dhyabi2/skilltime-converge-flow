
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateMySkill } from '@/hooks/useMySkills';
import { useCategories } from '@/hooks/useCategories';
import { skillAvailabilityService } from '@/services/supabase/skillAvailability';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from 'lucide-react';
import ExpertiseSelector from '@/components/skills/ExpertiseSelector';
import SkillAvailabilitySelector from '@/components/skills/SkillAvailabilitySelector';

interface TimeSlot {
  day_of_week: number;
  start_time: string;
  end_time: string;
}

const CreateSkill = () => {
  const navigate = useNavigate();
  const createSkill = useCreateMySkill();
  const { data: categories = [] } = useCategories();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const skillData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        expertise,
        use_cases: useCases,
      };

      const createdSkill = await createSkill.mutateAsync(skillData);
      
      // Add availability slots if any
      if (availability.length > 0 && createdSkill?.id) {
        const availabilityData = availability.map(slot => ({
          skill_id: createdSkill.id,
          day_of_week: slot.day_of_week,
          start_time: slot.start_time,
          end_time: slot.end_time,
        }));
        
        await skillAvailabilityService.createMultiple(availabilityData);
      }
      
      navigate('/my-skills');
    } catch (error) {
      console.error('Failed to create skill:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 to-mint-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/profile')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Create New Skill</h1>
            <p className="text-slate-600">Share your expertise with the community</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Skill Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Web Development, Guitar Lessons"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your skill and what you offer..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Logistics */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Logistics</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (OMR)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 minutes">30 minutes</SelectItem>
                    <SelectItem value="1 hour">1 hour</SelectItem>
                    <SelectItem value="2 hours">2 hours</SelectItem>
                    <SelectItem value="Half day">Half day</SelectItem>
                    <SelectItem value="Full day">Full day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => setFormData({ ...formData, location: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Muscat">Muscat</SelectItem>
                    <SelectItem value="Salalah">Salalah</SelectItem>
                    <SelectItem value="Nizwa">Nizwa</SelectItem>
                    <SelectItem value="Sur">Sur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Category */}
          <Card>
            <CardHeader>
              <CardTitle>Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Expertise */}
          <ExpertiseSelector
            expertise={expertise}
            onChange={setExpertise}
            placeholder="e.g., React, JavaScript, UI Design"
            title="Your Expertise"
          />

          {/* Use Cases */}
          <ExpertiseSelector
            expertise={useCases}
            onChange={setUseCases}
            placeholder="e.g., Build a modern website, Create a mobile app"
            title="Use Cases"
          />

          {/* Availability */}
          <SkillAvailabilitySelector
            availability={availability}
            onChange={setAvailability}
          />

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/profile')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createSkill.isPending}
              className="bg-gradient-to-r from-mint-500 to-soft-blue-500 hover:from-mint-600 hover:to-soft-blue-600"
            >
              <Save className="w-4 h-4 mr-2" />
              {createSkill.isPending ? 'Creating...' : 'Create Skill'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSkill;
