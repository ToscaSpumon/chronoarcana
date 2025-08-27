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
    
    // Note: We no longer automatically update existing daily pulls when changing decks
    // This preserves the user's card of the day and any notes they've added
    // Users can manually pull a new card if they want one from the new deck
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
    // Get the current date in the user's local timezone
    const now = new Date();
    
    // Create a date string that respects the local timezone
    // This ensures we get the date as it appears to the user in their timezone
    const localDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
    
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    
    const { data, error } = await supabase
      .from('daily_pulls')
      .select(`
        id,
        user_id,
        card_id,
        pull_date,
        pull_type,
        notes,
        is_reversed,
        created_at,
        updated_at
      `)
      .eq('user_id', userId)
      .eq('pull_date', todayStr)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    
    if (!data) return null;
    
    // Fetch card data separately to avoid column ambiguity
    const { data: cardData } = await supabase
      .from('tarot_cards')
      .select('*')
      .eq('id', data.card_id)
      .single();
    
    return {
      ...data,
      card: cardData
    };
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
    
    // First insert the pull without selecting data
    const { error: insertError } = await supabase
      .from('daily_pulls')
      .insert(pull);
    
    if (insertError) {
      console.error('❌ API: Insert error:', insertError);
      console.error('❌ API: Error details:', insertError.details);
      console.error('❌ API: Error hint:', insertError.hint);
      throw insertError;
    }
    
    // Log successful insertion
    console.log('✅ API: Pull inserted successfully');
    console.log('📝 Notes included:', !!pull.notes);
    console.log('📝 Notes length:', pull.notes?.length || 0);
    
    // Then fetch the created pull separately to avoid trigger conflicts
    const { data, error: selectError } = await supabase
      .from('daily_pulls')
      .select(`
        id,
        user_id,
        card_id,
        pull_date,
        pull_type,
        notes,
        is_reversed,
        created_at,
        updated_at
      `)
      .eq('user_id', pull.user_id)
      .eq('pull_date', pull.pull_date)
      .eq('card_id', pull.card_id)
      .single();
    
    if (selectError) {
      console.error('❌ API: Select error after insert:', selectError);
      throw selectError;
    }
    
    // Fetch the card data separately
    const { data: cardData, error: cardError } = await supabase
      .from('tarot_cards')
      .select('*')
      .eq('id', pull.card_id)
      .single();
    
    if (cardError) {
      console.error('❌ API: Card fetch error:', cardError);
      throw cardError;
    }
    
    // Combine the data
    const result = {
      ...data,
      card: cardData
    };
    
    console.log('✅ API: Pull created successfully:', result);
    return result;
  },

  updatePullNotes: async (pullId: string, notes: string) => {
    // Validate input
    if (!pullId) {
      throw new Error('Pull ID is required to update notes');
    }
    
    if (typeof notes !== 'string') {
      throw new Error('Notes must be a string');
    }
    
    console.log('🔍 API: Updating notes for pull:', pullId);
    console.log('📝 Notes length:', notes.length);
    
    // Update the notes
    const { data, error } = await supabase
      .from('daily_pulls')
      .update({ 
        notes: notes.trim(), // Trim whitespace
        updated_at: new Date().toISOString() 
      })
      .eq('id', pullId)
      .select(`
        id,
        user_id,
        card_id,
        pull_date,
        pull_type,
        notes,
        is_reversed,
        created_at,
        updated_at
      `)
      .single();
    
    if (error) {
      console.error('❌ API: Failed to update notes:', error);
      throw new Error(`Failed to update notes: ${error.message}`);
    }
    
    if (!data) {
      throw new Error('Pull record not found after update');
    }
    
    console.log('✅ API: Notes updated successfully for pull:', pullId);
    console.log('📝 Updated notes length:', data.notes?.length || 0);
    
    return data;
  },

  getRecentPulls: async (userId: string, limit: number = 30): Promise<DailyPull[]> => {
    const { data, error } = await supabase
      .from('daily_pulls')
      .select(`
        id,
        user_id,
        card_id,
        pull_date,
        pull_type,
        notes,
        is_reversed,
        created_at,
        updated_at
      `)
      .eq('user_id', userId)
      .order('pull_date', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    
    // Fetch card data separately to avoid column ambiguity
    const pullsWithCards = await Promise.all(
      (data || []).map(async (pull) => {
        const { data: cardData } = await supabase
          .from('tarot_cards')
          .select('*')
          .eq('id', pull.card_id)
          .single();
        
        return {
          ...pull,
          card: cardData
        };
      })
    );
    
    return pullsWithCards;
  },

  // Get pulls from the last 7 days
  getRecentPullsLast7Days: async (userId: string): Promise<DailyPull[]> => {
    // Calculate date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('daily_pulls')
      .select(`
        id,
        user_id,
        card_id,
        pull_date,
        pull_type,
        notes,
        is_reversed,
        created_at,
        updated_at
      `)
      .eq('user_id', userId)
      .gte('pull_date', sevenDaysAgoStr)
      .order('pull_date', { ascending: false });
    
    if (error) throw error;
    
    // Fetch card data separately to avoid column ambiguity
    const pullsWithCards = await Promise.all(
      (data || []).map(async (pull) => {
        const { data: cardData } = await supabase
          .from('tarot_cards')
          .select('*')
          .eq('id', pull.card_id)
          .single();
        
        return {
          ...pull,
          card: cardData
        };
      })
    );
    
    return pullsWithCards;
  },

  // Get pulls from the last 60 days (for analytics and export)
  getRecentPullsLast60Days: async (userId: string): Promise<DailyPull[]> => {
    // Calculate date 60 days ago
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    const sixtyDaysAgoStr = sixtyDaysAgo.toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('daily_pulls')
      .select(`
        id,
        user_id,
        card_id,
        pull_date,
        pull_type,
        notes,
        is_reversed,
        created_at,
        updated_at
      `)
      .eq('user_id', userId)
      .gte('pull_date', sixtyDaysAgoStr)
      .order('pull_date', { ascending: false });
    
    if (error) throw error;
    
    // Fetch card data separately to avoid column ambiguity
    const pullsWithCards = await Promise.all(
      (data || []).map(async (pull) => {
        const { data: cardData } = await supabase
          .from('tarot_cards')
          .select('*')
          .eq('id', pull.card_id)
          .single();
        
        return {
          ...pull,
          card: cardData
        };
      })
    );
    
    return pullsWithCards;
  },

  // Get notes for a specific pull
  getPullNotes: async (pullId: string): Promise<{ notes: string | null; updated_at: string }> => {
    if (!pullId) {
      throw new Error('Pull ID is required to retrieve notes');
    }
    
    const { data, error } = await supabase
      .from('daily_pulls')
      .select('notes, updated_at')
      .eq('id', pullId)
      .single();
    
    if (error) {
      console.error('❌ API: Failed to retrieve notes:', error);
      throw new Error(`Failed to retrieve notes: ${error.message}`);
    }
    
    if (!data) {
      throw new Error('Pull record not found');
    }
    
    return {
      notes: data.notes,
      updated_at: data.updated_at
    };
  },
};
