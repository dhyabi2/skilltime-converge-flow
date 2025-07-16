
import React from 'react';
import { BarChart3, TrendingUp, Award, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'skills' | 'bookings' | 'reviews' | 'rating';
  data: any;
  profile: any;
}

const StatsDetailModal: React.FC<StatsDetailModalProps> = ({
  isOpen,
  onClose,
  type,
  data,
  profile
}) => {
  const { t } = useTranslation('profile');

  const getModalContent = () => {
    switch (type) {
      case 'skills':
        return {
          title: t('stats_detail_modal.skills_overview.title'),
          icon: BarChart3,
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-blue-600">
                      {profile.skills?.length || 0}
                    </div>
                    <p className="text-sm text-gray-600">{t('stats_detail_modal.skills_overview.personal_skills')}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-green-600">
                      {data?.length || 0}
                    </div>
                    <p className="text-sm text-gray-600">{t('stats_detail_modal.skills_overview.marketplace_skills')}</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold">{t('stats_detail_modal.skills_overview.skill_categories')}</h3>
                {profile.skills?.map((skill: string, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>{skill}</span>
                    <span className="text-sm text-gray-500">{t('stats_detail_modal.skills_overview.personal')}</span>
                  </div>
                )) || <p className="text-gray-500">{t('stats_detail_modal.skills_overview.no_skills_yet')}</p>}
              </div>
            </div>
          )
        };

      case 'bookings':
        return {
          title: t('stats_detail_modal.bookings_analytics.title'),
          icon: Calendar,
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-xl font-bold text-green-600">12</div>
                    <p className="text-xs text-gray-600">{t('stats_detail_modal.bookings_analytics.completed')}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-xl font-bold text-yellow-600">3</div>
                    <p className="text-xs text-gray-600">{t('stats_detail_modal.bookings_analytics.pending')}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-xl font-bold text-blue-600">15</div>
                    <p className="text-xs text-gray-600">{t('stats_detail_modal.bookings_analytics.total')}</p>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">{t('stats_detail_modal.bookings_analytics.monthly_trend')}</h3>
                <div className="space-y-2">
                  {['jan', 'feb', 'mar', 'apr', 'may'].map((month, index) => (
                    <div key={month} className="flex items-center gap-3">
                      <span className="w-8 text-sm">{t(`stats_detail_modal.bookings_analytics.months.${month}`)}</span>
                      <Progress value={(index + 1) * 20} className="flex-1" />
                      <span className="text-sm text-gray-600">{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        };

      case 'reviews':
        return {
          title: t('stats_detail_modal.reviews_analysis.title'),
          icon: Award,
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">8</div>
                    <p className="text-sm text-gray-600">{t('stats_detail_modal.reviews_analysis.total_reviews')}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">4.8</div>
                    <p className="text-sm text-gray-600">{t('stats_detail_modal.reviews_analysis.average_rating')}</p>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">{t('stats_detail_modal.reviews_analysis.rating_distribution')}</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm">{rating} ⭐</span>
                      <Progress value={rating === 5 ? 80 : rating === 4 ? 15 : 5} className="flex-1" />
                      <span className="text-sm text-gray-600">
                        {rating === 5 ? '6' : rating === 4 ? '2' : '0'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        };

      case 'rating':
        return {
          title: t('stats_detail_modal.rating_breakdown.title'),
          icon: TrendingUp,
          content: (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">4.8</div>
                <div className="flex justify-center mb-2">
                  {'⭐'.repeat(5)}
                </div>
                <p className="text-gray-600">{t('stats_detail_modal.rating_breakdown.based_on_reviews', { count: 8 })}</p>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold">{t('stats_detail_modal.rating_breakdown.performance_areas')}</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{t('stats_detail_modal.rating_breakdown.communication')}</span>
                      <span className="text-sm">4.9/5</span>
                    </div>
                    <Progress value={98} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{t('stats_detail_modal.rating_breakdown.quality')}</span>
                      <span className="text-sm">4.8/5</span>
                    </div>
                    <Progress value={96} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{t('stats_detail_modal.rating_breakdown.timeliness')}</span>
                      <span className="text-sm">4.7/5</span>
                    </div>
                    <Progress value={94} />
                  </div>
                </div>
              </div>
            </div>
          )
        };

      default:
        return { 
          title: t('stats_detail_modal.no_data'), 
          icon: BarChart3, 
          content: <div>{t('stats_detail_modal.no_data')}</div> 
        };
    }
  };

  const { title, icon: Icon, content } = getModalContent();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="w-5 h-5" />
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatsDetailModal;
