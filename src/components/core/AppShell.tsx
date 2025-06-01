
import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import Header from './Header';

const AppShell = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default AppShell;
