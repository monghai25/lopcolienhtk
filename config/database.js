const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const schema = process.env.DB_SCHEMA || 'public';

if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️  Warning: Missing SUPABASE_URL or SUPABASE_ANON_KEY');
    console.warn('⚠️  Set these environment variables in Vercel dashboard:');
    console.warn('   - SUPABASE_URL');
    console.warn('   - SUPABASE_ANON_KEY');
    console.warn('   - DB_SCHEMA (optional, default: public)');
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
