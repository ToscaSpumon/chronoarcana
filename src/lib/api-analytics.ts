import { supabase } from './supabaseClient';

// Analytics API - continuation of api.ts
export const analyticsAPI = {
  getPullStats: async (userId: string, timeframe: 'month' | 'year' | 'all' = 'all') => {
    let query = supabase
      .from('daily_pulls')
      .select(`
        card_id,
        pull_date,
        card:tarot_cards(card_name, suit)
      `)
      .eq('user_id', userId);

    // Apply timeframe filter
    if (timeframe === 'month') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      query = query.gte('pull_date', oneMonthAgo.toISOString().split('T')[0]);
    } else if (timeframe === 'year') {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      query = query.gte('pull_date', oneYearAgo.toISOString().split('T')[0]);
    }

    const { data, error } = await query.order('pull_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  exportUserData: async (userId: string): Promise<string> => {
    const { data, error } = await supabase
      .from('daily_pulls')
      .select(`
        pull_date,
        pull_type,
        is_reversed,
        notes,
        card:tarot_cards(card_name, suit, keywords)
      `)
      .eq('user_id', userId)
      .order('pull_date', { ascending: false });

    if (error) throw error;

    // Convert to CSV format
    const headers = ['Date', 'Card Name', 'Suit', 'Pull Type', 'Reversed', 'Notes', 'Keywords'];
    const csvData = data?.map(pull => [
      pull.pull_date,
      (pull.card as any)?.card_name || '',
      (pull.card as any)?.suit || '',
      pull.pull_type,
      pull.is_reversed ? 'Yes' : 'No',
      pull.notes || '',
      (pull.card as any)?.keywords || '',
    ]);

    const csvContent = [
      headers.join(','),
      ...(csvData?.map(row => row.map(field => `"${field}"`).join(',')) || [])
    ].join('\n');

    return csvContent;
  },
};

// Data cleanup API
export const cleanupAPI = {
  deleteExpiredPulls: async () => {
    const { error } = await supabase.rpc('delete_expired_free_user_pulls');
    if (error) throw error;
  },

  updateMostPulledCard: async (userId: string) => {
    const { error } = await supabase.rpc('update_most_pulled_card', {
      user_uuid: userId,
    });
    if (error) throw error;
  },
};

// Subscription API
export const subscriptionAPI = {
  createCheckoutSession: async (userId: string, priceId: string) => {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        priceId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { sessionId } = await response.json();
    return sessionId;
  },

  createCustomerPortalSession: async () => {
    const response = await fetch('/api/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to create portal session');
    }

    const { url } = await response.json();
    return url;
  },
};