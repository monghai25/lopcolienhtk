const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const schema = process.env.DB_SCHEMA || 'lopcolien';

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env');
    process.exit(1);
}

// Tạo Supabase client
const supabase = createClient(supabaseUrl, supabaseKey, {
    db: {
        schema: schema
    },
    auth: {
        persistSession: false,
        autoRefreshToken: false
    }
});

// Test connection
(async () => {
    try {
        console.log('=== SUPABASE CONNECTION TEST ===');
        console.log('URL:', supabaseUrl);
        console.log('Schema:', schema);
        console.log('');
        
        // Test query
        const { data, error } = await supabase
            .from('users')
            .select('count')
            .eq('del', 0)
            .limit(1);
        
        if (error) {
            console.error('❌ Connection error:', error.message);
        } else {
            console.log('✅ Supabase connected successfully!');
            console.log('✅ Schema:', schema);
            console.log('=== DATABASE READY ===\n');
        }
    } catch (err) {
        console.error('❌ Unexpected error:', err.message);
    }
})();

module.exports = { supabase };
