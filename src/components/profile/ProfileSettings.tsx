
import React, { useState } from 'react';
import { Save, User, Mail, Phone, MapPin, Camera, Bell, Shield, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';

interface ProfileSettingsProps {
  profile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => Promise<boolean>;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ profile, onUpdateProfile }) => {
  const [formData, setFormData] = useState({
    name: profile.name || '',
    email: profile.email || '',
    phone: profile.phone || '',
    location: profile.location || '',
    bio: profile.bio || '',
    avatar: profile.avatar || ''
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      const success = await onUpdateProfile(formData);
      if (success) {
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1 sm:mb-2">Account Settings</h2>
        <p className="text-slate-600 text-sm">Manage your account information and preferences</p>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          {/* Avatar */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 mx-auto sm:mx-0">
              <AvatarImage src={formData.avatar} alt={formData.name} />
              <AvatarFallback className="text-base sm:text-lg">
                {formData.name ? formData.name.charAt(0).toUpperCase() : '?'}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Change Photo
              </Button>
              <p className="text-xs text-slate-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="name" className="text-xs sm:text-sm">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="text-xs sm:text-sm"
              />
            </div>
            
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="email" className="text-xs sm:text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="text-xs sm:text-sm"
              />
            </div>
            
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="phone" className="text-xs sm:text-sm">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter your phone number"
                className="text-xs sm:text-sm"
              />
            </div>
            
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="location" className="text-xs sm:text-sm">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter your location"
                className="text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="bio" className="text-xs sm:text-sm">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us about yourself..."
              rows={3}
              className="text-xs sm:text-sm"
            />
          </div>

          <Button onClick={handleSave} disabled={isUpdating} className="w-full sm:w-auto text-xs sm:text-sm">
            <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            {isUpdating ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Email notifications</p>
              <p className="text-xs sm:text-sm text-slate-600">Receive booking updates via email</p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Push notifications</p>
              <p className="text-xs sm:text-sm text-slate-600">Receive notifications on your device</p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">SMS notifications</p>
              <p className="text-xs sm:text-sm text-slate-600">Receive important updates via SMS</p>
            </div>
            <Switch
              checked={notifications.sms}
              onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Marketing emails</p>
              <p className="text-xs sm:text-sm text-slate-600">Receive promotional emails and updates</p>
            </div>
            <Switch
              checked={notifications.marketing}
              onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
            Privacy Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Profile visibility</p>
              <p className="text-xs sm:text-sm text-slate-600">Make your profile visible to other users</p>
            </div>
            <Switch
              checked={privacy.profileVisible}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, profileVisible: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Show email</p>
              <p className="text-xs sm:text-sm text-slate-600">Display your email on your public profile</p>
            </div>
            <Switch
              checked={privacy.showEmail}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, showEmail: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Show phone number</p>
              <p className="text-xs sm:text-sm text-slate-600">Display your phone number on your public profile</p>
            </div>
            <Switch
              checked={privacy.showPhone}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, showPhone: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-red-600 text-base sm:text-lg">
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="destructive" size="sm" className="text-xs sm:text-sm">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
