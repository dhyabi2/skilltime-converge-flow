
import React from 'react';
import { Search, LogOut, User, Settings, Menu, GitBranch } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import LanguageToggle from './LanguageToggle';

interface MobileDrawerProps {
  user: SupabaseUser | null;
  onSearchClick: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ user, onSearchClick }) => {
  const { t: tCommon } = useTranslation('common');
  const { t: tNav } = useTranslation('navigation');
  const { t: tUI } = useTranslation('ui');
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-white/30 transition-colors"
        >
          <Menu className="h-5 w-5 text-slate-700" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white/95 backdrop-blur-md border-t border-soft-blue-200">
        <DrawerHeader className="text-center border-b border-soft-blue-200/50 pb-4">
          <DrawerTitle className="text-xl font-bold text-slate-800">
            {tCommon('app.name')}
          </DrawerTitle>
        </DrawerHeader>
        
        <div className="p-6 space-y-4">
          {/* Language Toggle */}
          <LanguageToggle />

          {/* Search */}
          <button 
            onClick={onSearchClick}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/40 backdrop-blur-sm border border-white/50 hover:bg-white/60 transition-all duration-200"
          >
            <Search className="w-4 h-4 text-slate-700" />
            <span className="text-sm font-medium text-slate-700">{tNav('search')}</span>
          </button>

          {/* Flowchart */}
          <button 
            onClick={() => handleNavigation('/flowchart')}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/40 backdrop-blur-sm border border-white/50 hover:bg-white/60 transition-all duration-200"
          >
            <GitBranch className="w-4 h-4 text-slate-700" />
            <span className="text-sm font-medium text-slate-700">{tNav('flowchart')}</span>
          </button>

          {/* Navigation Links */}
          {user && (
            <div className="space-y-2">
              <button 
                onClick={() => handleNavigation('/profile')}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/40 backdrop-blur-sm border border-white/50 hover:bg-white/60 transition-all duration-200"
              >
                <User className="w-4 h-4 text-slate-700" />
                <span className="text-sm font-medium text-slate-700">{tNav('profile')}</span>
              </button>
              
              <button 
                onClick={() => handleNavigation('/bookings')}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/40 backdrop-blur-sm border border-white/50 hover:bg-white/60 transition-all duration-200"
              >
                <Settings className="w-4 h-4 text-slate-700" />
                <span className="text-sm font-medium text-slate-700">{tNav('my_bookings')}</span>
              </button>
              
              <button 
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-red-100/60 backdrop-blur-sm border border-red-200/50 hover:bg-red-200/60 transition-all duration-200"
              >
                <LogOut className="w-4 h-4 text-red-700" />
                <span className="text-sm font-medium text-red-700">{tCommon('auth.sign_out')}</span>
              </button>
            </div>
          )}
        </div>
        
        <DrawerClose asChild>
          <Button variant="outline" className="mx-6 mb-6">
            {tUI('close')}
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileDrawer;
