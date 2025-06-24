
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from "@/components/ui/toaster";
import { useRTL } from './hooks/useRTL';
import AppShell from './components/core/AppShell';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import Index from './pages/Index';
import Home from './pages/Home';
import Browse from './pages/Browse';
import SkillDetail from './pages/SkillDetail';
import BookingCreate from './pages/BookingCreate';
import BookingConfirmation from './pages/BookingConfirmation';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';
import MySkills from './pages/MySkills';
import CreateSkill from './pages/CreateSkill';
import Auth from './pages/Auth';
import Notifications from './pages/Notifications';
import Flowchart from './pages/Flowchart';
import Offline from './pages/Offline';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const AppContent = () => {
  useRTL();

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/offline" element={<Offline />} />
        <Route element={<AppShell />}>
          <Route path="/home" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/skill/:id" element={<SkillDetail />} />
          <Route path="/book/:skillId" element={<ProtectedRoute><BookingCreate /></ProtectedRoute>} />
          <Route path="/booking-confirmation/:bookingId" element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/my-skills" element={<ProtectedRoute><MySkills /></ProtectedRoute>} />
          <Route path="/create-skill" element={<ProtectedRoute><CreateSkill /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/flowchart" element={<Flowchart />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <AppContent />
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
