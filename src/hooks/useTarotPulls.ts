import { useState, useEffect } from 'react';
import { DailyPull, TarotCard } from '@/types';
import { pullAPI, tarotAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { getTodayDate } from '@/utils/helpers';

export const useTarotPulls = () => {
  const { user } = useAuth();
  const [todaysPull, setTodaysPull] = useState<DailyPull | null>(null);
  const [recentPulls, setRecentPulls] = useState<DailyPull[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to determine if user needs to pull for today
  const needsTodayPull = () => {
    if (!todaysPull) {
      // Check if user has any recent pulls to determine if it's a new day or first time
      const hasPulledBefore = recentPulls.length > 0;
      return {
        needsPull: true,
        isNewDay: hasPulledBefore,
        isFirstTime: !hasPulledBefore
      };
    }
    return {
      needsPull: false,
      isNewDay: false,
      isFirstTime: false
    };
  };

  const fetchTodaysPull = async () => {
    if (!user) return;
    
    try {
      const pull = await pullAPI.getTodaysPull(user.id);
      setTodaysPull(pull);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch today\'s pull');
    }
  };

  const fetchRecentPulls = async () => {
    if (!user) return;
    
    try {
      const pulls = await pullAPI.getRecentPulls(user.id);
      setRecentPulls(pulls);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch recent pulls');
    }
  };

  const createPull = async (cardId: number, pullType: 'digital' | 'physical', notes?: string) => {
    if (!user) throw new Error('User not authenticated');
    
    const pullData = {
      user_id: user.id,
      card_id: cardId,
      pull_date: getTodayDate(),
      pull_type: pullType,
      notes: notes || '',
      is_reversed: false, // Future feature
    };

    try {
      const newPull = await pullAPI.createPull(pullData);
      setTodaysPull(newPull);
      await fetchRecentPulls(); // Refresh recent pulls
      return newPull;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create pull');
    }
  };

  const updatePullNotes = async (pullId: string, notes: string) => {
    // Validate input
    if (!pullId) {
      throw new Error('Pull ID is required to update notes');
    }
    
    if (typeof notes !== 'string') {
      throw new Error('Notes must be a string');
    }
    
    try {
      console.log('🔍 Hook: Updating notes for pull:', pullId);
      console.log('📝 Notes length:', notes.length);
      
      const updatedPull = await pullAPI.updatePullNotes(pullId, notes);
      
      // Verify notes were updated correctly
      if (updatedPull.notes !== notes.trim()) {
        console.warn('⚠️ Hook: Notes may not have been updated correctly');
      }
      
      // Update state
      if (todaysPull?.id === pullId) {
        setTodaysPull(updatedPull);
      }
      
      setRecentPulls(prev => 
        prev.map(pull => pull.id === pullId ? updatedPull : pull)
      );
      
      console.log('✅ Hook: Notes updated successfully for pull:', pullId);
      return updatedPull;
    } catch (err) {
      console.error('❌ Hook: Failed to update notes:', err);
      throw new Error(err instanceof Error ? err.message : 'Failed to update notes');
    }
  };

  const refresh = async () => {
    if (!user) return;
    setLoading(true);
    await Promise.all([fetchTodaysPull(), fetchRecentPulls()]);
    setLoading(false);
  };

  // Get notes for a specific pull
  const getPullNotes = async (pullId: string) => {
    if (!user || !pullId) return null;
    
    try {
      const notesData = await pullAPI.getPullNotes(pullId);
      return notesData;
    } catch (err) {
      console.error('Failed to retrieve notes:', err);
      return null;
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      Promise.all([fetchTodaysPull(), fetchRecentPulls()])
        .finally(() => setLoading(false));
    } else {
      setTodaysPull(null);
      setRecentPulls([]);
      setLoading(false);
    }
  }, [user]);

  // Check for date changes and refresh data if needed
  useEffect(() => {
    if (!user) return;
    
    const checkDateChange = () => {
      const currentDate = getTodayDate();
      const lastCheckedDate = localStorage.getItem('lastDateChecked');
      
      if (lastCheckedDate !== currentDate) {
        // Date has changed, refresh the data
        localStorage.setItem('lastDateChecked', currentDate);
        refresh();
      }
    };
    
    // Check immediately
    checkDateChange();
    
    // Set up interval to check every minute (in case user keeps the page open past midnight)
    const interval = setInterval(checkDateChange, 60000);
    
    return () => clearInterval(interval);
  }, [user, refresh]);

  return {
    todaysPull,
    recentPulls,
    loading,
    error,
    createPull,
    updatePullNotes,
    refresh,
    needsTodayPull,
    getPullNotes,
  };
};
