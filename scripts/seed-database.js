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

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  try {
    // Seed tarot decks
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
      .upsert(RIDER_WAITE_CARDS);

    if (riderWaiteError) {
      throw new Error(`Failed to seed Rider Waite cards: ${riderWaiteError.message}`);
    }

    console.log(`✅ Seeded ${RIDER_WAITE_CARDS.length} Rider Waite cards`);

    // Seed Thoth cards
    console.log('🔮 Seeding Thoth cards...');
    const { error: thothError } = await supabase
      .from('tarot_cards')
      .upsert(THOTH_CARDS);

    if (thothError) {
      throw new Error(`Failed to seed Thoth cards: ${thothError.message}`);
    }

    console.log(`✅ Seeded ${THOTH_CARDS.length} Thoth cards`);

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase();