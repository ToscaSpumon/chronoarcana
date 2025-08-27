const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkDatabaseContent() {
  console.log('🔍 Checking database content...');

  try {
    // Check tarot decks
    console.log('\n📚 Tarot Decks:');
    const { data: decks, error: decksError } = await supabase
      .from('tarot_decks')
      .select('*')
      .order('id');

    if (decksError) {
      throw new Error(`Failed to fetch decks: ${decksError.message}`);
    }

    console.log(`Found ${decks.length} decks:`);
    decks.forEach(deck => {
      console.log(`  - ${deck.id}: ${deck.name} (${deck.description})`);
      if (deck.image_url) {
        console.log(`    Image: ${deck.image_url}`);
      }
    });

    // Check tarot cards count by deck
    console.log('\n🃏 Tarot Cards by Deck:');
    const { data: cards, error: cardsError } = await supabase
      .from('tarot_cards')
      .select('deck_id, card_name, suit')
      .order('deck_id, card_number');

    if (cardsError) {
      throw new Error(`Failed to fetch cards: ${cardsError.message}`);
    }

    const cardsByDeck = {};
    cards.forEach(card => {
      if (!cardsByDeck[card.deck_id]) {
        cardsByDeck[card.deck_id] = [];
      }
      cardsByDeck[card.deck_id].push(card);
    });

    Object.keys(cardsByDeck).forEach(deckId => {
      const deck = decks.find(d => d.id == deckId);
      const deckName = deck ? deck.name : `Deck ${deckId}`;
      const deckCards = cardsByDeck[deckId];
      
      console.log(`\n${deckName} (${deckCards.length} cards):`);
      
      // Group by suit
      const bySuit = {};
      deckCards.forEach(card => {
        const suit = card.suit || 'Unknown';
        if (!bySuit[suit]) bySuit[suit] = [];
        bySuit[suit].push(card.card_name);
      });
      
      Object.keys(bySuit).forEach(suit => {
        console.log(`  ${suit}: ${bySuit[suit].length} cards`);
        if (suit === 'Major Arcana') {
          bySuit[suit].forEach(cardName => {
            console.log(`    - ${cardName}`);
          });
        }
      });
    });

    console.log('\n✅ Database content check completed!');
  } catch (error) {
    console.error('❌ Error checking database content:', error);
    process.exit(1);
  }
}

// Run the check
checkDatabaseContent();
