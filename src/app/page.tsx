'use client';

import { useAuth } from '@/contexts/AuthContext';
import LandingPage from '@/components/LandingPage';
import Dashboard from '@/components/Dashboard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useEffect } from 'react';

export default function Home() {
  const { user, userProfile, loading } = useAuth();

  // Debug logging
  useEffect(() => {
    console.log('Auth state changed:', { user: !!user, userProfile: !!userProfile, loading });
  }, [user, userProfile, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  // Ensure we have both user and userProfile before showing dashboard
  if (user && userProfile) {
    return <Dashboard />;
  }

  return <LandingPage />;
}
