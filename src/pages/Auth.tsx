
import React, { useState, useRef, useEffect } from 'react';
import { User, Building, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'seeker' | 'provider'>('seeker');
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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div
        ref={containerRef}
        className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to SkillTime
          </h1>
          <p className="text-white/80">
            Where Skills Converge & Opportunities Flow
          </p>
        </div>

        {/* User Type Selection (only for signup) */}
        {!isLogin && (
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3">I want to:</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                className={`user-type-btn p-4 rounded-2xl border-2 transition-all ${
                  userType === 'seeker'
                    ? 'border-white bg-white/20 text-white'
                    : 'border-white/30 text-white/70 hover:border-white/50'
                }`}
                onClick={() => handleUserTypeSelect('seeker')}
              >
                <User className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Find Skills</span>
              </button>
              <button
                className={`user-type-btn p-4 rounded-2xl border-2 transition-all ${
                  userType === 'provider'
                    ? 'border-white bg-white/20 text-white'
                    : 'border-white/30 text-white/70 hover:border-white/50'
                }`}
                onClick={() => handleUserTypeSelect('provider')}
              >
                <Building className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Offer Skills</span>
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <Input
              type="text"
              placeholder="Full Name"
              className="bg-white/10 border-white/30 text-white placeholder-white/60 rounded-2xl py-3"
            />
          )}
          
          <Input
            type="email"
            placeholder="Email Address"
            className="bg-white/10 border-white/30 text-white placeholder-white/60 rounded-2xl py-3"
          />
          
          <Input
            type="password"
            placeholder="Password"
            className="bg-white/10 border-white/30 text-white placeholder-white/60 rounded-2xl py-3"
          />

          {!isLogin && (
            <Input
              type="password"
              placeholder="Confirm Password"
              className="bg-white/10 border-white/30 text-white placeholder-white/60 rounded-2xl py-3"
            />
          )}

          <Button
            type="submit"
            className="submit-btn w-full py-4 text-lg font-semibold bg-white text-purple-600 hover:bg-white/90 rounded-2xl flex items-center justify-center space-x-2"
          >
            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </form>

        {/* Form Switch */}
        <div className="text-center mt-6">
          <button
            onClick={handleFormSwitch}
            className="text-white/80 hover:text-white transition-colors"
          >
            {isLogin 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"
            }
          </button>
        </div>

        {/* Social Login */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm mb-3">Or continue with</p>
          <div className="flex space-x-3">
            <button className="flex-1 py-3 bg-white/10 border border-white/30 rounded-2xl text-white hover:bg-white/20 transition-colors">
              Google
            </button>
            <button className="flex-1 py-3 bg-white/10 border border-white/30 rounded-2xl text-white hover:bg-white/20 transition-colors">
              Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
