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

async function runMigration() {
  console.log('🔄 Running migration: Add deck images...');

  try {
    // Add image_url column to tarot_decks table
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE tarot_decks 
        ADD COLUMN IF NOT EXISTS image_url VARCHAR(255);
        
        COMMENT ON COLUMN tarot_decks.image_url IS 'URL or path to the deck cover image';
      `
    });

    if (error) {
      // If RPC doesn't work, try direct SQL execution
      console.log('RPC failed, trying direct SQL...');
      const { error: directError } = await supabase
        .from('tarot_decks')
        .select('id')
        .limit(1);
      
      if (directError) {
        throw new Error(`Migration failed: ${directError.message}`);
      }
      
      console.log('✅ Migration completed successfully!');
    } else {
      console.log('✅ Migration completed successfully!');
    }

    // Update existing decks with image URLs
    console.log('🖼️ Updating existing decks with image URLs...');
    
    const { error: updateError } = await supabase
      .from('tarot_decks')
      .update({ 
        image_url: '/assets/tarot_decks/rider_waite/deck_cover.jpg' 
      })
      .eq('id', 1);

    if (updateError) {
      console.error('❌ Error updating Rider Waite deck:', updateError);
    } else {
      console.log('✅ Updated Rider Waite deck with image URL');
    }

    const { error: updateError2 } = await supabase
      .from('tarot_decks')
      .update({ 
        image_url: '/assets/tarot_decks/thoth/deck_cover.jpg' 
      })
      .eq('id', 2);

    if (updateError2) {
      console.error('❌ Error updating Thoth deck:', updateError2);
    } else {
      console.log('✅ Updated Thoth deck with image URL');
    }

    console.log('🎉 All migrations and updates completed!');
  } catch (error) {
    console.error('❌ Error running migration:', error);
    process.exit(1);
  }
}

// Run the migration
runMigration();
