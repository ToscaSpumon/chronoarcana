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
    try {
      const updatedPull = await pullAPI.updatePullNotes(pullId, notes);
      
      // Update state
      if (todaysPull?.id === pullId) {
        setTodaysPull(updatedPull);
      }
      
      setRecentPulls(prev => 
        prev.map(pull => pull.id === pullId ? updatedPull : pull)
      );
      
      return updatedPull;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update notes');
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

  const refresh = async () => {
    if (!user) return;
    setLoading(true);
    await Promise.all([fetchTodaysPull(), fetchRecentPulls()]);
    setLoading(false);
  };

  return {
    todaysPull,
    recentPulls,
    loading,
    error,
    createPull,
    updatePullNotes,
    refresh,
  };
};
