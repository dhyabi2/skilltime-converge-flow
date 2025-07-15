
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileHeader from './MobileHeader';

const Header = () => {
  const isMobile = useIsMobile();

  // Always use mobile header since we're optimizing for mobile
  return <MobileHeader />;
};

export default Header;
