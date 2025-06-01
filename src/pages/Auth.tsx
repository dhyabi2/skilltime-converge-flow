
import React, { useState, useRef, useEffect } from 'react';
import { User, Building, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'seeker' | 'provider'>('seeker');
  const { t } = useTranslation('auth');
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  const handleFormSwitch = () => {
    if (formRef.current) {
      gsap.to(formRef.current, {
        x: -20,
        opacity: 0.5,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          setIsLogin(!isLogin);
          gsap.to(formRef.current, {
            x: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    }
  };

  const handleUserTypeSelect = (type: 'seeker' | 'provider') => {
    setUserType(type);
    // Animate selection
    const buttons = document.querySelectorAll('.user-type-btn');
    buttons.forEach((btn, index) => {
      if ((index === 0 && type === 'seeker') || (index === 1 && type === 'provider')) {
        gsap.to(btn, { scale: 1.05, duration: 0.1, yoyo: true, repeat: 1 });
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission animation
    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
    // Handle authentication logic here
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div
        ref={containerRef}
        className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            {t('welcome.title')}
          </h1>
          <p className="text-gray-600">
            {t('welcome.subtitle')}
          </p>
        </div>

        {/* User Type Selection (only for signup) */}
        {!isLogin && (
          <div className="mb-6">
            <h3 className="text-black font-semibold mb-3">{t('user_type.title')}</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                className={`user-type-btn p-4 rounded-2xl border-2 transition-all ${
                  userType === 'seeker'
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
                onClick={() => handleUserTypeSelect('seeker')}
              >
                <User className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">{t('user_type.find_skills')}</span>
              </button>
              <button
                className={`user-type-btn p-4 rounded-2xl border-2 transition-all ${
                  userType === 'provider'
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
                onClick={() => handleUserTypeSelect('provider')}
              >
                <Building className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">{t('user_type.offer_skills')}</span>
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <Input
              type="text"
              placeholder={t('forms.full_name')}
              className="border-gray-300 rounded-2xl py-3"
            />
          )}
          
          <Input
            type="email"
            placeholder={t('forms.email')}
            className="border-gray-300 rounded-2xl py-3"
          />
          
          <Input
            type="password"
            placeholder={t('forms.password')}
            className="border-gray-300 rounded-2xl py-3"
          />

          {!isLogin && (
            <Input
              type="password"
              placeholder={t('forms.confirm_password')}
              className="border-gray-300 rounded-2xl py-3"
            />
          )}

          <Button
            type="submit"
            className="submit-btn w-full py-4 text-lg font-semibold bg-black text-white hover:bg-gray-800 rounded-2xl flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <span>{isLogin ? t('buttons.sign_in') : t('buttons.create_account')}</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </form>

        {/* Form Switch */}
        <div className="text-center mt-6">
          <button
            onClick={handleFormSwitch}
            className="text-gray-600 hover:text-black transition-colors"
          >
            {isLogin 
              ? t('links.no_account')
              : t('links.have_account')
            }
          </button>
        </div>

        {/* Social Login */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm mb-3">{t('social.continue_with')}</p>
          <div className="flex space-x-3 rtl:space-x-reverse">
            <button className="flex-1 py-3 border border-gray-300 rounded-2xl text-gray-600 hover:bg-gray-50 transition-colors">
              {t('social.google')}
            </button>
            <button className="flex-1 py-3 border border-gray-300 rounded-2xl text-gray-600 hover:bg-gray-50 transition-colors">
              {t('social.apple')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
