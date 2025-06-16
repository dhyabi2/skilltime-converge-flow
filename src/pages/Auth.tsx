
import React, { useState, useRef, useEffect } from 'react';
import { User, Building, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'seeker' | 'provider'>('seeker');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { t } = useTranslation('auth');
  const { toast } = useToast();
  const navigate = useNavigate();
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

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();
  }, [navigate]);

  const handleFormSwitch = () => {
    if (formRef.current) {
      gsap.to(formRef.current, {
        x: -20,
        opacity: 0.5,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          setIsLogin(!isLogin);
          setFormData({
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Logged in successfully!",
        });
        navigate('/');
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords don't match");
        }

        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              user_type: userType,
            },
            emailRedirectTo: `${window.location.origin}/`
          }
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Account created! Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    }
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

        {/* Google Sign-In Button */}
        <div className="mb-6">
          <Button
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full py-4 text-lg font-semibold bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-2xl flex items-center justify-center space-x-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>{isLogin ? 'Sign in with Google' : 'Sign up with Google'}</span>
          </Button>
        </div>

        {/* Divider */}
        <div className="text-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleEmailAuth} className="space-y-4">
          {!isLogin && (
            <Input
              type="text"
              name="fullName"
              placeholder={t('forms.full_name')}
              value={formData.fullName}
              onChange={handleInputChange}
              className="border-gray-300 rounded-2xl py-3"
              required
            />
          )}
          
          <Input
            type="email"
            name="email"
            placeholder={t('forms.email')}
            value={formData.email}
            onChange={handleInputChange}
            className="border-gray-300 rounded-2xl py-3"
            required
          />
          
          <Input
            type="password"
            name="password"
            placeholder={t('forms.password')}
            value={formData.password}
            onChange={handleInputChange}
            className="border-gray-300 rounded-2xl py-3"
            required
          />

          {!isLogin && (
            <Input
              type="password"
              name="confirmPassword"
              placeholder={t('forms.confirm_password')}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="border-gray-300 rounded-2xl py-3"
              required
            />
          )}

          <Button
            type="submit"
            disabled={loading}
            className="submit-btn w-full py-4 text-lg font-semibold bg-black text-white hover:bg-gray-800 rounded-2xl flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <span>{loading ? 'Loading...' : (isLogin ? t('buttons.sign_in') : t('buttons.create_account'))}</span>
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
      </div>
    </div>
  );
};

export default Auth;
