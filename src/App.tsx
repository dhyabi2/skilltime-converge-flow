
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useRTL } from "./hooks/useRTL";
import { useFullscreen } from "./hooks/useFullscreen";
import AppShell from "./components/core/AppShell";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import SkillDetail from "./pages/SkillDetail";
import BookingConfirmation from "./pages/BookingConfirmation";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Offline from "./pages/Offline";
import { InstallPrompt } from "./components/pwa/InstallPrompt";
import { OfflineIndicator } from "./components/pwa/OfflineIndicator";

const queryClient = new QueryClient();

const AppContent = () => {
  const { requestFullscreen } = useFullscreen();
  
  // Use the robust RTL hook that doesn't depend on i18n context
  useRTL();
  
  useEffect(() => {
    // Request fullscreen when app loads
    const timer = setTimeout(() => {
      requestFullscreen();
    }, 1000); // Small delay to ensure app is fully loaded
    
    return () => clearTimeout(timer);
  }, [requestFullscreen]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <OfflineIndicator />
        <InstallPrompt />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/offline" element={<Offline />} />
            <Route path="/" element={<AppShell />}>
              <Route index element={<Home />} />
              <Route path="browse" element={<Browse />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="profile" element={<Profile />} />
              <Route path="skill/:id" element={<SkillDetail />} />
              <Route path="booking/:id" element={<BookingConfirmation />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const App = () => (
  <AppContent />
);

export default App;
