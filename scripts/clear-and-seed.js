const { createClient } = require('@supabase/supabase-js');
const { TAROT_DECKS, RIDER_WAITE_CARDS, THOTH_CARDS } = require('./tarot-data.js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function clearAndSeedDatabase() {
  console.log('🧹 Starting database clear and seed process...');

  try {
    // First, clear existing daily pulls (they reference tarot cards)
    console.log('🗑️ Clearing existing daily pulls...');
    const { error: deletePullsError } = await supabase
      .from('daily_pulls')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all pulls

    if (deletePullsError) {
      throw new Error(`Failed to clear daily pulls: ${deletePullsError.message}`);
    }

    console.log('✅ Cleared existing daily pulls');

    // Clear user references to tarot cards
    console.log('👥 Clearing user references to tarot cards...');
    const { error: updateUsersError } = await supabase
      .from('users')
      .update({ 
        chosen_deck_id: null, 
        most_pulled_card_id: null 
      })
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (updateUsersError) {
      throw new Error(`Failed to clear user references: ${updateUsersError.message}`);
    }

    console.log('✅ Cleared user references to tarot cards');

    // Now clear existing tarot cards
    console.log('🗑️ Clearing existing tarot cards...');
    const { error: deleteError } = await supabase
      .from('tarot_cards')
      .delete()
      .neq('id', 0); // Delete all cards

    if (deleteError) {
      throw new Error(`Failed to clear cards: ${deleteError.message}`);
    }

    console.log('✅ Cleared existing tarot cards');

    // Seed tarot decks (these should already exist, but upsert will handle conflicts)
    console.log('📚 Seeding tarot decks...');
    const { error: decksError } = await supabase
      .from('tarot_decks')
      .upsert(TAROT_DECKS, { onConflict: 'id' });

    if (decksError) {
      throw new Error(`Failed to seed decks: ${decksError.message}`);
    }

    console.log(`✅ Seeded ${TAROT_DECKS.length} tarot decks`);

    // Seed Rider Waite cards
    console.log('🃏 Seeding Rider Waite cards...');
    const { error: riderWaiteError } = await supabase
      .from('tarot_cards')
      .insert(RIDER_WAITE_CARDS);

    if (riderWaiteError) {
      throw new Error(`Failed to seed Rider Waite cards: ${riderWaiteError.message}`);
    }

    console.log(`✅ Seeded ${RIDER_WAITE_CARDS.length} Rider Waite cards`);

    // Seed Thoth cards
    console.log('🔮 Seeding Thoth cards...');
    const { error: thothError } = await supabase
      .from('tarot_cards')
      .insert(THOTH_CARDS);

    if (thothError) {
      throw new Error(`Failed to seed Thoth cards: ${thothError.message}`);
    }

    console.log(`✅ Seeded ${THOTH_CARDS.length} Thoth cards`);

    console.log('🎉 Database clear and seed completed successfully!');
    console.log(`📊 Total cards now in database: ${RIDER_WAITE_CARDS.length + THOTH_CARDS.length}`);
  } catch (error) {
    console.error('❌ Error during clear and seed:', error);
    process.exit(1);
  }
}

// Run the clear and seed function
clearAndSeedDatabase();
