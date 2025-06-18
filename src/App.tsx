
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRTL } from "./hooks/useRTL";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AppShell from "./components/core/AppShell";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import MySkills from "./pages/MySkills";
import Notifications from "./pages/Notifications";
import SkillDetail from "./pages/SkillDetail";
import BookingConfirmation from "./pages/BookingConfirmation";
import BookingCreate from "./pages/BookingCreate";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Offline from "./pages/Offline";
import { InstallPrompt } from "./components/pwa/InstallPrompt";
import { OfflineIndicator } from "./components/pwa/OfflineIndicator";
import { ReactHealthMonitor } from "./components/dev/ReactHealthMonitor";

const queryClient = new QueryClient();

// Separate component to ensure React context is available
const AppContent: React.FC = () => {
  // Enhanced React safety check
  if (!React || typeof React.useState !== 'function') {
    console.error('React hooks are not available in AppContent');
    return <div>React initialization error</div>;
  }

  // Use the robust RTL hook that doesn't depend on i18n context
  useRTL();
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <OfflineIndicator />
          <InstallPrompt />
          <ReactHealthMonitor />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/offline" element={<Offline />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <AppShell />
                </ProtectedRoute>
              }>
                <Route index element={<Home />} />
                <Route path="browse" element={<Browse />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="profile" element={<Profile />} />
                <Route path="my-skills" element={<MySkills />} />
                <Route path="skill/:id" element={<SkillDetail />} />
                <Route path="booking/create" element={<BookingCreate />} />
                <Route path="booking/:id" element={<BookingConfirmation />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

const App: React.FC = () => {
  // Comprehensive React validation with detailed logging
  if (!React) {
    console.error('React module is not available');
    return <div>React module loading error</div>;
  }

  if (typeof React.useState !== 'function') {
    console.error('React hooks are not available - React version issue');
    return <div>React hooks initialization error</div>;
  }

  if (typeof React.useEffect !== 'function') {
    console.error('React useEffect is not available');
    return <div>React useEffect initialization error</div>;
  }

  console.log('React initialization successful');
  return <AppContent />;
};

export default App;
