import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useMySkills } from '@/hooks/useMySkills';
import { useCheckBadges } from '@/hooks/useBadges';
import { useUserBookings } from '@/hooks/useRealBookings';
import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import PullToRefresh from '@/components/ui/pull-to-refresh';

// Mobile-optimized components
import MobileProfileHeader from '@/components/profile/mobile/MobileProfileHeader';
import MobileProfileTabs from '@/components/profile/MobileProfileTabs';
import MobileBookingCard from '@/components/profile/mobile/MobileBookingCard';
import MobileSkillCard from '@/components/profile/mobile/MobileSkillCard';
import MobileReviewCard from '@/components/profile/mobile/MobileReviewCard';

// Existing components
import ProfileOverview from '@/components/profile/ProfileOverview';
import ProfileReviews from '@/components/profile/ProfileReviews';
import ProfileSettings from '@/components/profile/ProfileSettings';
import CreateSkillModal from '@/components/skills/CreateSkillModal';
import BookingDetailModal from '@/components/profile/modals/BookingDetailModal';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { profile, loading, removeSkill, updateProfile, refetch: refetchProfile } = useProfile();
  const { data: mySkills = [], isLoading: skillsLoading, refetch: refetchSkills } = useMySkills();
  const { data: bookings = [], refetch: refetchBookings } = useUserBookings();
  const checkBadges = useCheckBadges();
  const { t } = useTranslation('profile');
  const { toast } = useToast();

  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Check for new badges when profile loads
  useEffect(() => {
    if (profile?.id) {
      checkBadges.mutate();
    }
  }, [profile?.id]);

  // Pull to refresh functionality
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        refetchProfile(),
        refetchSkills(),
        refetchBookings(),
      ]);
      toast({
        title: "Refreshed",
        description: "Profile data has been updated",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Could not update profile data",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  // Booking actions
  const handleCall = (booking: any) => {
    const phone = booking.client?.phone || booking.provider?.phone;
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleMessage = (booking: any) => {
    // Would integrate with messaging system
    toast({
      title: "Messaging",
      description: "Messaging feature coming soon",
    });
  };

  const handleDirections = (booking: any) => {
    if (booking.location && booking.location !== 'Remote') {
      const encodedLocation = encodeURIComponent(booking.location);
      window.open(`https://maps.google.com/?q=${encodedLocation}`, '_blank');
    }
  };

  // Skill actions
  const handleShareSkill = async (skill: any) => {
    const skillUrl = `${window.location.origin}/skill/${skill.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: skill.skillTitle,
          text: skill.description,
          url: skillUrl,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      await navigator.clipboard.writeText(skillUrl);
      toast({
        title: "Link copied!",
        description: "Skill link has been copied to clipboard",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-white to-mint-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-soft-blue-200 border-t-soft-blue-600 mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl animate-pulse">✨</span>
            </div>
          </div>
          <p className="text-slate-600 text-sm animate-pulse">{t('loading.profile')}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-white to-mint-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">😔</div>
          <p className="text-slate-600 mb-4 text-sm">{t('loading.error')}</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-soft-blue-600 hover:text-soft-blue-700 text-sm bg-soft-blue-50 hover:bg-soft-blue-100 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
          >
            {t('loading.try_again')}
          </button>
        </div>
      </div>
    );
  }

  // Calculate notification counts
  const notificationCounts = {
    bookings: bookings.filter(b => b.status === 'pending').length,
    reviews: 0, // Would come from unread reviews
    settings: 0, // Would come from profile completion or verification needs
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-white to-mint-50">
      <PullToRefresh onRefresh={handleRefresh} disabled={isRefreshing}>
        <div className="max-w-4xl mx-auto px-3 py-4">
          <MobileProfileHeader 
            profile={profile}
            onSignOut={signOut}
          />
          
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <MobileProfileTabs defaultValue="overview" notificationCounts={notificationCounts}>
              
              <TabsContent value="overview" className="p-3 mt-0 animate-fade-in">
                <ProfileOverview 
                  profile={profile}
                  mySkills={mySkills}
                  skillsLoading={skillsLoading}
                  onRemoveSkill={removeSkill}
                />
              </TabsContent>
              
              <TabsContent value="skills" className="p-3 mt-0 animate-fade-in">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <span className="text-xl">🎯</span>
                        {t('skills.marketplace_title')}
                      </h2>
                      <p className="text-sm text-slate-600">{t('skills.marketplace_subtitle')}</p>
                    </div>
                    <CreateSkillModal />
                  </div>

                  {/* Skills Grid */}
                  {skillsLoading ? (
                    <div className="grid grid-cols-1 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-48 bg-gray-200 rounded-lg"></div>
                        </div>
                      ))}
                    </div>
                  ) : mySkills.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-6xl mb-4 animate-bounce">🚀</div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">{t('skills.ready_to_earn')}</h3>
                      <p className="text-slate-600 mb-4 text-sm">{t('skills.share_expertise')}</p>
                      <CreateSkillModal />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {mySkills.map((skill) => (
                        <MobileSkillCard
                          key={skill.id}
                          skill={skill}
                          onShare={handleShareSkill}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="bookings" className="p-3 mt-0 animate-fade-in">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <span className="text-xl">📅</span>
                      {t('bookings.title')}
                    </h2>
                  </div>

                  {bookings.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-6xl mb-4 animate-bounce">📅</div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">{t('bookings.no_bookings')}</h3>
                      <p className="text-slate-600 text-sm">{t('bookings.no_bookings_subtitle')}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {bookings.map((booking) => (
                        <MobileBookingCard
                          key={booking.id}
                          booking={booking}
                          onViewDetails={setSelectedBooking}
                          onCall={handleCall}
                          onMessage={handleMessage}
                          onDirections={handleDirections}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="p-3 mt-0 animate-fade-in">
                <ProfileReviews userId={profile.id} />
              </TabsContent>
              
              <TabsContent value="settings" className="p-3 mt-0 animate-fade-in">
                <ProfileSettings 
                  profile={profile}
                  onUpdateProfile={updateProfile}
                />
              </TabsContent>
              
            </MobileProfileTabs>
          </Card>
        </div>
      </PullToRefresh>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
};

export default Profile;
