
import React from 'react';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation('profile');
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-black mb-4">{t('title')}</h1>
        <p className="text-gray-600">{t('coming_soon')}</p>
      </div>
    </div>
  );
};

export default Profile;
