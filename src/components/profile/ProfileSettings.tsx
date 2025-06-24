
import React, { useState } from 'react';
import { Save, User, Mail, Phone, MapPin, Camera, Bell, Shield, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('profile');
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

  const validatePhone = (phone: string) => {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const handleSave = async () => {
    // Validate phone if provided
    if (formData.phone && !validatePhone(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

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
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1 sm:mb-2">{t('settings.title')}</h2>
        <p className="text-slate-600 text-sm">{t('settings.subtitle')}</p>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
            {t('settings.profile_info')}
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
                {t('settings.change_photo')}
              </Button>
              <p className="text-xs text-slate-500 mt-1">{t('settings.photo_requirements')}</p>
            </div>
          </div>

          {/* Avatar URL Input */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1 sm:space-y-2 lg:col-span-2">
              <Label htmlFor="avatar" className="text-xs sm:text-sm">{t('edit_profile_modal.avatar_url')}</Label>
              <Input
                id="avatar"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
                className="text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="name" className="text-xs sm:text-sm">{t('edit_profile_modal.full_name')}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('edit_profile_modal.full_name')}
                className="text-xs sm:text-sm"
              />
            </div>
            
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="email" className="text-xs sm:text-sm">{t('edit_profile_modal.email')}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t('edit_profile_modal.email')}
                className="text-xs sm:text-sm"
              />
            </div>
            
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="phone" className="text-xs sm:text-sm">
                <Phone className="w-3 h-3 inline mr-1" />
                {t('edit_profile_modal.phone')}
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+968 12345678"
                className="text-xs sm:text-sm"
              />
            </div>
            
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="location" className="text-xs sm:text-sm">
                <MapPin className="w-3 h-3 inline mr-1" />
                {t('edit_profile_modal.location')}
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Muscat, Oman"
                className="text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="bio" className="text-xs sm:text-sm">{t('edit_profile_modal.bio')}</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder={t('edit_profile_modal.bio')}
              rows={3}
              className="text-xs sm:text-sm"
            />
          </div>

          <Button onClick={handleSave} disabled={isUpdating} className="w-full sm:w-auto text-xs sm:text-sm">
            <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            {isUpdating ? t('settings.saving') : t('settings.save_changes')}
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            {t('settings.notifications')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{t('settings.email_notifications')}</p>
              <p className="text-xs sm:text-sm text-slate-600">{t('settings.email_notifications_desc')}</p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{t('settings.push_notifications')}</p>
              <p className="text-xs sm:text-sm text-slate-600">{t('settings.push_notifications_desc')}</p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{t('settings.sms_notifications')}</p>
              <p className="text-xs sm:text-sm text-slate-600">{t('settings.sms_notifications_desc')}</p>
            </div>
            <Switch
              checked={notifications.sms}
              onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{t('settings.marketing_emails')}</p>
              <p className="text-xs sm:text-sm text-slate-600">{t('settings.marketing_emails_desc')}</p>
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
            {t('settings.privacy_settings')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{t('settings.profile_visibility')}</p>
              <p className="text-xs sm:text-sm text-slate-600">{t('settings.profile_visibility_desc')}</p>
            </div>
            <Switch
              checked={privacy.profileVisible}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, profileVisible: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{t('settings.show_email')}</p>
              <p className="text-xs sm:text-sm text-slate-600">{t('settings.show_email_desc')}</p>
            </div>
            <Switch
              checked={privacy.showEmail}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, showEmail: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{t('settings.show_phone')}</p>
              <p className="text-xs sm:text-sm text-slate-600">{t('settings.show_phone_desc')}</p>
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
            {t('settings.danger_zone')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4">
            {t('settings.delete_warning')}
          </p>
          <Button variant="destructive" size="sm" className="text-xs sm:text-sm">
            {t('settings.delete_account')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
