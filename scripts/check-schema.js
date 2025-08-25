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

async function checkSchema() {
  console.log('🔍 Checking current table schema...');

  try {
    // Try to get a sample record to see the structure
    const { data, error } = await supabase
      .from('tarot_decks')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Error querying tarot_decks:', error);
      return;
    }

    console.log('📋 Current tarot_decks table structure:');
    if (data && data.length > 0) {
      const sampleRecord = data[0];
      console.log('Sample record:', JSON.stringify(sampleRecord, null, 2));
      
      console.log('\n📊 Available columns:');
      Object.keys(sampleRecord).forEach(key => {
        console.log(`  - ${key}: ${typeof sampleRecord[key]}`);
      });
    } else {
      console.log('No data found in tarot_decks table');
    }

    // Try to insert a test record with image_url to see if the column exists
    console.log('\n🧪 Testing image_url column...');
    const { error: insertError } = await supabase
      .from('tarot_decks')
      .insert({
        name: 'Test Deck',
        description: 'Test deck for schema validation',
        image_url: '/test/image.jpg'
      });

    if (insertError) {
      console.log('❌ image_url column does not exist:', insertError.message);
    } else {
      console.log('✅ image_url column exists!');
      
      // Clean up test record
      await supabase
        .from('tarot_decks')
        .delete()
        .eq('name', 'Test Deck');
    }

  } catch (error) {
    console.error('❌ Error checking schema:', error);
  }
}

// Run the check
checkSchema();
