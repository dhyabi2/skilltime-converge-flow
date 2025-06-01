import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient } from 'react-query';

import Index from './pages/Index';
import AppShell from './components/core/AppShell';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import SkillList from './pages/SkillList';
import SkillDetails from './pages/SkillDetails';
import BookingList from './pages/BookingList';
import BookingDetails from './pages/BookingDetails';
import CreateSkill from './pages/CreateSkill';
import EditSkill from './pages/EditSkill';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import InstallPrompt from './components/pwa/InstallPrompt';
import OfflineIndicator from './components/pwa/OfflineIndicator';

function App() {
  return (
    <QueryClient>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Toaster />
        <OfflineIndicator />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppShell />}>
              <Route index element={<Index />} />
              <Route path="skills" element={<SkillList />} />
              <Route path="skills/:id" element={<SkillDetails />} />
              <Route path="bookings" element={<BookingList />} />
              <Route path="bookings/:id" element={<BookingDetails />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="create-skill" element={<CreateSkill />} />
              <Route path="edit-skill/:id" element={<EditSkill />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/401" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <InstallPrompt />
      </div>
    </QueryClient>
  );
}

export default App;
