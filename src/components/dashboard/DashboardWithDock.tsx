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
import DeckToggle from '@/components/dashboard/DeckToggle';
import UpgradePrompt from '@/components/dashboard/UpgradePrompt';
import Dock from '@/components/common/Dock';
import { getDaysUntilRetention, getMostPulledCard } from '@/utils/helpers';
import { APP_CONFIG } from '@/utils/constants';
import { userAPI } from '@/lib/api';
import { 
  Calendar, 
  BarChart3, 
  BookOpen, 
  Settings, 
  Plus, 
  History,
  Sparkles,
  Crown
} from 'lucide-react';

const DashboardWithDock: React.FC = () => {
  const { userProfile } = useAuth();
  const { todaysPull, recentPulls, recentPulls60Days, loading, error, needsTodayPull, refresh } = useTarotPulls();
  const [showDeckSelector, setShowDeckSelector] = useState(false);
  const [activeSection, setActiveSection] = useState('daily-pull');

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

  // Get most pulled card info (based on 60 days for analytics)
  const mostPulledCard = getMostPulledCard(recentPulls60Days);

  // Handle deck change
  const handleDeckChange = async (deckId: number) => {
    if (!userProfile) return;
    
    try {
      await userAPI.updateChosenDeck(userProfile.id, deckId);
      // Refresh the user profile to get the updated chosen_deck_id
      window.location.reload(); // Simple refresh for now, could be optimized later
    } catch (err) {
      console.error('Failed to update deck:', err);
      // Could add a toast notification here
    }
  };

  // Handle when a new pull is created
  const handlePullCreated = async () => {
    await refresh(); // Refresh the data to show the new pull immediately
  };

  // Handle when notes are updated for a pull
  const handleNotesUpdated = (pullId: string, notes: string) => {
    // Update the recentPulls array to reflect the notes change
    // This ensures the notes icon shows up immediately without refreshing
    const updatedRecentPulls = recentPulls.map(pull => 
      pull.id === pullId ? { ...pull, notes: notes } : pull
    );
    
    // Update the recentPulls60Days array as well
    const updatedRecentPulls60Days = recentPulls60Days.map(pull => 
      pull.id === pullId ? { ...pull, notes: notes } : pull
    );
    
    // Force a re-render by updating the state
    // Note: In a more sophisticated setup, you might want to use a state management solution
    // For now, we'll trigger a refresh to get the updated data
    refresh();
  };

  // Dock items configuration
  const dockItems = [
    {
      icon: <Plus className="w-6 h-6 text-emerald-whisper" />,
      label: 'Daily Pull',
      onClick: () => setActiveSection('daily-pull'),
      className: activeSection === 'daily-pull' ? 'ring-2 ring-emerald-whisper' : ''
    },
    {
      icon: <History className="w-6 h-6 text-astral-gold" />,
      label: 'Pull History',
      onClick: () => setActiveSection('recent-pulls'),
      className: activeSection === 'recent-pulls' ? 'ring-2 ring-astral-gold' : ''
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-crimson-stain" />,
      label: 'Analytics',
      onClick: () => setActiveSection('analytics'),
      className: activeSection === 'analytics' ? 'ring-2 ring-crimson-stain' : ''
    },
    {
      icon: <Crown className="w-6 h-6 text-astral-gold" />,
      label: 'Upgrade',
      onClick: () => setActiveSection('upgrade'),
      className: activeSection === 'upgrade' ? 'ring-2 ring-astral-gold' : ''
    }
  ];

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="xl" text="Loading your dashboard..." />
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

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'daily-pull':
        return (
          <DailyPullSection 
            todaysPull={todaysPull}
            userDeckId={userProfile?.chosen_deck_id}
            onPullCreated={handlePullCreated}
            onDeckChange={handleDeckChange}
            recentPulls60Days={recentPulls60Days}
          />
        );
      case 'recent-pulls':
        return (
          <RecentPullsList 
            pulls={recentPulls}
            pulls60Days={recentPulls60Days}
            isFreeTier={userProfile?.subscription_status === 'free'}
            onNotesUpdated={handleNotesUpdated}
          />
        );
      case 'analytics':
        return (
          <DataVisualization pulls={recentPulls60Days} />
        );
      case 'upgrade':
        return (
          <div className="space-y-6">
            {userProfile?.subscription_status === 'free' && daysUntilRetention !== null && (
              <UpgradePrompt daysRemaining={daysUntilRetention} />
            )}
            <div className="card text-center">
              <h3 className="text-xl font-cinzel font-semibold text-lunar-glow mb-4">
                Subscription Status
              </h3>
              <div className="mb-4">
                {userProfile?.subscription_status === 'premium' ? (
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-lg font-medium bg-astral-gold text-deep-void">
                    <Crown className="w-5 h-5 mr-2" />
                    Premium Member
                  </span>
                ) : (
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-lg font-medium bg-midnight-aura text-lunar-glow">
                    Free Journey
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <DailyPullSection 
            todaysPull={todaysPull}
            userDeckId={userProfile?.chosen_deck_id}
            onPullCreated={handlePullCreated}
            onDeckChange={handleDeckChange}
            recentPulls60Days={recentPulls60Days}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-void via-shadow-veil to-deep-void relative">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-lunar-glow mb-4">
            Welcome back, {userProfile?.username}
          </h1>
          
          {/* New Day Notification */}
          {!todaysPull && needsTodayPull().isNewDay && (
            <div className="mb-6 p-4 bg-emerald-whisper bg-opacity-10 border border-emerald-whisper border-opacity-30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-emerald-whisper rounded-full animate-pulse"></div>
                <p className="text-emerald-whisper font-medium">
                  ✨ New day, new possibilities! Time to draw your daily card.
                </p>
              </div>
            </div>
          )}
          
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

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto">
          {renderActiveSection()}
        </div>
      </div>

      {/* Dock Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
        <Dock 
          items={dockItems}
          className="bg-deep-void/90 backdrop-blur-sm border-lunar-glow/20"
          magnification={80}
          baseItemSize={60}
          panelHeight={80}
        />
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

export default DashboardWithDock;
