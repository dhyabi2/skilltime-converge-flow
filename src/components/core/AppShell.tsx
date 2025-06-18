
import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import Header from './Header';

const AppShell = () => {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col overflow-x-hidden liquid-bg">
      <Header />
      <main className="flex-1 w-full pb-20 sm:pb-24 relative">
        <div className="w-full max-w-full">
          <Outlet />
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default AppShell;
