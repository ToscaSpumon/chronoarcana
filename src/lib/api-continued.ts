// Tarot API (continued from previous file)
export const tarotAPI = {
  getDecks: async (): Promise<TarotDeck[]> => {
    const { data, error } = await supabase
      .from('tarot_decks')
      .select('*')
      .order('id');
    
    if (error) throw error;
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
    const { data, error } = await supabase
      .from('daily_pulls')
      .insert(pull)
      .select(`
        *,
        card:tarot_cards(*)
      `)
      .single();
    
    if (error) throw error;
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
