'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTarotPulls } from '@/hooks/useTarotPulls';
import Navbar from '@/components/common/Navbar';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import DeckSelector from '@/components/tarot/DeckSelector';
import DailyPullSection from '@/components/dashboard/DailyPullSection';
import RecentPullsList from '@/components/dashboard/RecentPullsList';
import DataVisualization from '@/components/dashboard/DataVisualization';
import ProfileBadge from '@/components/dashboard/ProfileBadge';
import UpgradePrompt from '@/components/dashboard/UpgradePrompt';
import { getDaysUntilRetention, getMostPulledCard } from '@/utils/helpers';
import { APP_CONFIG } from '@/utils/constants';

const Dashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const { todaysPull, recentPulls, loading, error } = useTarotPulls();
  const [showDeckSelector, setShowDeckSelector] = useState(false);

  // Check if user needs to select a deck
  useEffect(() => {
    if (userProfile && !userProfile.chosen_deck_id) {
      setShowDeckSelector(true);
    }
  }, [userProfile]);

  // Calculate retention info for free users
  const daysUntilRetention = userProfile?.subscription_status === 'free' 
    ? getDaysUntilRetention(userProfile.created_at, APP_CONFIG.FREE_TRIAL_DAYS)
    : null;

  // Get most pulled card info
  const mostPulledCard = getMostPulledCard(recentPulls);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="large" text="Loading your dashboard..." />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-crimson-stain mb-4">Failed to load dashboard</p>
            <p className="text-lunar-glow opacity-70">{error}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-void via-shadow-veil to-deep-void">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-lunar-glow mb-4">
            Welcome back, {userProfile?.username}
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lunar-glow opacity-80 text-lg">
              Continue your mystical journey
            </p>
            
            {/* Subscription status */}
            <div className="mt-2 sm:mt-0">
              {userProfile?.subscription_status === 'premium' ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-astral-gold text-deep-void">
                  Premium Member
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-midnight-aura text-lunar-glow">
                  Free Journey
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Free user upgrade prompt */}
        {userProfile?.subscription_status === 'free' && daysUntilRetention !== null && (
          <UpgradePrompt daysRemaining={daysUntilRetention} className="mb-8" />
        )}

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Daily Pull Section */}
            <DailyPullSection 
              todaysPull={todaysPull}
              userDeckId={userProfile?.chosen_deck_id}
            />
            
            {/* Recent Pulls */}
            <RecentPullsList 
              pulls={recentPulls}
              isFreeTier={userProfile?.subscription_status === 'free'}
            />
            
            {/* Data Visualization */}
            <DataVisualization pulls={recentPulls} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Profile Badge */}
            <ProfileBadge 
              mostPulledCard={mostPulledCard}
              totalPulls={recentPulls.length}
            />
            
            {/* Quick Stats */}
            <div className="card">
              <h3 className="text-xl font-cinzel font-semibold text-lunar-glow mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-lunar-glow opacity-70">Total Pulls</span>
                  <span className="text-astral-gold font-semibold">{recentPulls.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lunar-glow opacity-70">This Month</span>
                  <span className="text-astral-gold font-semibold">
                    {recentPulls.filter(pull => {
                      const pullDate = new Date(pull.pull_date);
                      const now = new Date();
                      return pullDate.getMonth() === now.getMonth() && 
                             pullDate.getFullYear() === now.getFullYear();
                    }).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lunar-glow opacity-70">Streak</span>
                  <span className="text-astral-gold font-semibold">
                    {todaysPull ? '🔥 Active' : '💤 Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deck Selector Modal */}
      {showDeckSelector && (
        <DeckSelector
          isOpen={showDeckSelector}
          onClose={() => setShowDeckSelector(false)}
          onDeckSelected={() => setShowDeckSelector(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;