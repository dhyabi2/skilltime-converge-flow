
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
                <Route path="profile" element={<Profile />} />
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
  // Ensure React is properly imported and available
  if (!React || typeof React.useState !== 'function') {
    console.error('React hooks are not available');
    return <div>React initialization error</div>;
  }

  return <AppContent />;
};

export default App;
