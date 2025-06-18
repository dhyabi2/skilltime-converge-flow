import React, { useEffect, useState } from 'react';
import { notificationsAPI } from '../services/modules/notifications';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';

const Notifications = () => {
  const { user } = useAuth();
  const { t } = useTranslation('common');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await notificationsAPI.getAll(user.id);
      setItems(data);
    } catch (error) {
      console.error('Error fetching notifications', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [user]);

  const handleMarkAll = async () => {
    if (!user) return;
    await notificationsAPI.markAllAsRead(user.id);
    fetchData();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">{t('notifications.title')}</h1>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center">{t('notifications.empty')}</p>
      ) : (
        <div className="space-y-4">
          {items.map((n) => (
            <div key={n.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="font-medium">{n.title}</p>
              <p className="text-sm text-gray-600">{n.message}</p>
            </div>
          ))}
        </div>
      )}
      {items.length > 0 && (
        <div className="mt-6 text-center">
          <Button size="sm" onClick={handleMarkAll}>{t('notifications.mark_all_read')}</Button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
