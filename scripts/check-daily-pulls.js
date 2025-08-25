const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDailyPullsTable() {
  console.log('🔍 Checking daily_pulls table...');
  
  try {
    // Check if table exists by trying to select from it
    const { data, error } = await supabase
      .from('daily_pulls')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Error accessing daily_pulls table:', error);
      
      if (error.code === 'PGRST116') {
        console.log('📋 Table exists but has no data');
      } else if (error.code === '42P01') {
        console.log('❌ Table does not exist');
      } else {
        console.log('❌ Other error:', error.message);
      }
    } else {
      console.log('✅ daily_pulls table exists and is accessible');
      console.log('📊 Sample data:', data);
    }
    
    // Try to get table structure by checking what columns exist
    console.log('\n🔍 Checking table structure...');
    
    // Try a simple insert with proper UUID format
    const testPull = {
      user_id: '00000000-0000-0000-0000-000000000000', // Valid UUID format
      card_id: 1,
      pull_date: new Date().toISOString().split('T')[0],
      pull_type: 'digital',
      notes: 'Test pull',
      is_reversed: false
    };
    
    console.log('🧪 Testing insert with data:', testPull);
    
    const { error: insertError } = await supabase
      .from('daily_pulls')
      .insert(testPull);
    
    if (insertError) {
      console.log('❌ Insert test failed:', insertError.message);
      console.log('🔍 This suggests the table structure is different than expected');
      
      // Try to get more details about the error
      if (insertError.details) {
        console.log('📋 Error details:', insertError.details);
      }
      if (insertError.hint) {
        console.log('💡 Error hint:', insertError.hint);
      }
    } else {
      console.log('✅ Insert test succeeded - table structure is correct');
      
      // Clean up test data
      const { error: deleteError } = await supabase
        .from('daily_pulls')
        .delete()
        .eq('user_id', '00000000-0000-0000-0000-000000000000');
      
      if (deleteError) {
        console.log('⚠️ Warning: Could not clean up test data:', deleteError.message);
      } else {
        console.log('🧹 Test data cleaned up successfully');
      }
    }
    
    // Try to get some actual data to see the structure
    console.log('\n🔍 Checking existing data structure...');
    const { data: existingData, error: existingError } = await supabase
      .from('daily_pulls')
      .select('*')
      .limit(5);
    
    if (existingError) {
      console.log('❌ Could not fetch existing data:', existingError.message);
    } else if (existingData && existingData.length > 0) {
      console.log('📊 Found existing data, structure:', Object.keys(existingData[0]));
      console.log('📋 Sample record:', existingData[0]);
    } else {
      console.log('📋 No existing data found');
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

checkDailyPullsTable();
