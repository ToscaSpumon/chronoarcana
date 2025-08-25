import { supabase } from './supabaseClient';
import { User, TarotDeck, TarotCard, DailyPull, PullAnalytics } from '@/types';

// Authentication API
export const authAPI = {
  signUp: async (email: string, password: string, username: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    
    // Create user profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          username,
          email,
        });
      
      if (profileError) throw profileError;
    }
    
    return data;
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    // Ensure user profile exists
    if (data.user) {
      try {
        console.log('Checking if user profile exists for:', data.user.id);
        
        // Try to get existing profile
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('id')
          .eq('id', data.user.id)
          .maybeSingle(); // Use maybeSingle instead of single to avoid errors
        
        if (profileError) {
          console.error('Error checking user profile:', profileError);
          throw profileError;
        }
        
        if (!profile) {
          // Profile doesn't exist, create one
          console.log('Creating missing user profile for:', data.user.id);
          const { error: createError } = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              username: data.user.email?.split('@')[0] || 'user',
              email: data.user.email,
            });
          
          if (createError) {
            console.error('Failed to create user profile:', createError);
            throw new Error(`Failed to create user profile: ${createError.message}`);
          }
          
          console.log('User profile created successfully');
        } else {
          console.log('User profile already exists');
        }
      } catch (profileError) {
        console.error('Profile handling error:', profileError);
        throw profileError;
      }
    }
    
    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  resetPassword: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  },
};

// User Profile API
export const userAPI = {
  getProfile: async (userId: string): Promise<User> => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error(`Failed to get profile for user ${userId}:`, error);
      throw error;
    }
    
    if (!data) {
      console.error(`No profile found for user ${userId}`);
      throw new Error('User profile not found');
    }
    
    return data;
  },

  updateProfile: async (userId: string, updates: Partial<User>) => {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  updateChosenDeck: async (userId: string, deckId: number) => {
    const { error } = await supabase
      .from('users')
      .update({ chosen_deck_id: deckId })
      .eq('id', userId);
    
    if (error) throw error;
  },
};

// Tarot API
export const tarotAPI = {
  getDecks: async (): Promise<TarotDeck[]> => {
    console.log('🔍 API: Fetching decks from supabase...');
    const { data, error } = await supabase
      .from('tarot_decks')
      .select('*')
      .order('id');
    
    console.log('🔍 API: Supabase response:', { data, error });
    
    if (error) {
      console.error('❌ API: Error fetching decks:', error);
      throw error;
    }
    
    console.log('✅ API: Successfully fetched decks:', data);
    return data || [];
  },

  getCards: async (deckId?: number): Promise<TarotCard[]> => {
    let query = supabase.from('tarot_cards').select('*');
    
    if (deckId) {
      query = query.eq('deck_id', deckId);
    }
    
    const { data, error } = await query.order('card_number');
    
    if (error) throw error;
    return data || [];
  },

  getCardById: async (cardId: number): Promise<TarotCard> => {
    const { data, error } = await supabase
      .from('tarot_cards')
      .select('*')
      .eq('id', cardId)
      .single();
    
    if (error) throw error;
    return data;
  },
};

// Daily Pull API
export const pullAPI = {
  getTodaysPull: async (userId: string): Promise<DailyPull | null> => {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('daily_pulls')
      .select(`
        *,
        card:tarot_cards(*)
      `)
      .eq('user_id', userId)
      .eq('pull_date', today)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  },

  createPull: async (pull: Omit<DailyPull, 'id' | 'created_at' | 'updated_at'>) => {
    console.log('🔍 API: Creating pull with data:', pull);
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) {
      console.error('❌ API: Auth error:', authError);
      throw new Error(`Authentication error: ${authError.message}`);
    }
    
    if (!user) {
      console.error('❌ API: No authenticated user');
      throw new Error('No authenticated user');
    }
    
    console.log('✅ API: User authenticated:', user.id);
    console.log('🔍 API: Pull user_id:', pull.user_id);
    console.log('🔍 API: Auth user_id:', user.id);
    
    // Verify user_id matches authenticated user
    if (pull.user_id !== user.id) {
      console.error('❌ API: User ID mismatch');
      throw new Error('User ID mismatch - security violation');
    }
    
    const { data, error } = await supabase
      .from('daily_pulls')
      .insert(pull)
      .select(`
        *,
        card:tarot_cards(*)
      `)
      .single();
    
    if (error) {
      console.error('❌ API: Insert error:', error);
      console.error('❌ API: Error details:', error.details);
      console.error('❌ API: Error hint:', error.hint);
      throw error;
    }
    
    console.log('✅ API: Pull created successfully:', data);
    return data;
  },

  updatePullNotes: async (pullId: string, notes: string) => {
    const { data, error } = await supabase
      .from('daily_pulls')
      .update({ notes, updated_at: new Date().toISOString() })
      .eq('id', pullId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  getRecentPulls: async (userId: string, limit: number = 30): Promise<DailyPull[]> => {
    const { data, error } = await supabase
      .from('daily_pulls')
      .select(`
        *,
        card:tarot_cards(*)
      `)
      .eq('user_id', userId)
      .order('pull_date', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data || [];
  },
};
