
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('auth');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Redirect if already authenticated
    if (user) {
      navigate('/');
      return;
    }

    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [user, navigate]);

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      // Use current domain for redirect instead of hardcoded URL
      const redirectTo = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Redirecting to Google...",
      });
    } catch (error: any) {
      console.error('Google auth error:', error);
      toast({
        title: "Authentication Error",
        description: error.message || "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  // Don't render if user is already authenticated
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue-400 via-soft-blue-300 to-mint-400 flex items-center justify-center p-4">
      <div
        ref={containerRef}
        className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-white/20"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            {t('welcome.title')}
          </h1>
          <p className="text-slate-600">
            {t('welcome.subtitle')}
          </p>
        </div>

        {/* Google Sign-In Button */}
        <div className="space-y-4">
          <Button
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full py-4 text-lg font-semibold bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-2xl flex items-center justify-center space-x-3 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
          </Button>

          <div className="text-center text-sm text-slate-500 mt-4">
            <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
