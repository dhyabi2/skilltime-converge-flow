
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserProfile } from '@/hooks/useProfile';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  onSave: (updates: Partial<UserProfile>) => Promise<boolean>;
  updating: boolean;
}

interface ProfileFormData {
  name: string;
  email: string;
  bio: string;
  location: string;
  phone: string;
  avatar: string;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ 
  isOpen, 
  onClose, 
  profile, 
  onSave, 
  updating 
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormData>();

  useEffect(() => {
    if (profile && isOpen) {
      reset({
        name: profile.name || '',
        email: profile.email || '',
        bio: profile.bio || '',
        location: profile.location || '',
        phone: profile.phone || '',
        avatar: profile.avatar || '',
      });
    }
  }, [profile, isOpen, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    const success = await onSave(data);
    if (success) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name"
              {...register('name', { required: 'Name is required' })}
              placeholder="Enter your full name"
              className="mt-1"
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              placeholder="Enter your email"
              className="mt-1"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="avatar">Avatar URL</Label>
            <Input 
              id="avatar"
              {...register('avatar')}
              placeholder="Enter image URL for your avatar"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              {...register('bio')}
              placeholder="Tell us about yourself..."
              className="mt-1"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location"
              {...register('location')}
              placeholder="City, Country"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone"
              {...register('phone')}
              placeholder="+1234567890"
              className="mt-1"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={updating}
              className="bg-soft-blue-600 hover:bg-soft-blue-700"
            >
              {updating ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
