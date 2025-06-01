
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Index from './pages/Index';
import AppShell from './components/core/AppShell';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Auth from './pages/Auth';
import Offline from './pages/Offline';
import InstallPrompt from './components/pwa/InstallPrompt';
import OfflineIndicator from './components/pwa/OfflineIndicator';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Toaster />
        <OfflineIndicator />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppShell />}>
              <Route index element={<Index />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="/auth" element={<Auth />} />
            <Route path="/offline" element={<Offline />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <InstallPrompt />
      </div>
    </QueryClientProvider>
  );
}

export default App;
