import React from 'react';
import { Toaster } from "@/components/ui/toaster.jsx"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { LanguageProvider } from '@/lib/LanguageContext';
import { isBase44Configured } from '@/api/base44Client';

import AppLayout from './components/health/AppLayout';
import RequireAuth from './components/RequireAuth';
import LoginGate from './components/LoginGate';
import Home from './pages/Home';
import SymptomChecker from './pages/SymptomChecker';
import PCODChecker from './pages/PCODChecker';
import NeuroCheck from './pages/NeuroCheck';
import Appointments from './pages/Appointments';
import Emergency from './pages/Emergency';
import HealthRecords from './pages/HealthRecords';
import About from './pages/About';
import Auth from './pages/Auth';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, isAuthenticated } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError?.type === 'user_not_registered') {
    return <UserNotRegisteredError />;
  }

  if (isBase44Configured && !isAuthenticated) {
    return <LoginGate />;
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/symptoms" element={<SymptomChecker />} />
        <Route path="/pcod" element={<PCODChecker />} />
        <Route path="/neuro-check" element={<NeuroCheck />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/records" element={<HealthRecords />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
