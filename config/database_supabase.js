// Alternative: Supabase JS Client
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://fxbsvhdyilztynexwffq.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Anon key từ Supabase

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    db: {
        schema: 'lopcolien'
    }
});

// Example usage:
// const { data, error } = await supabase
//     .from('users')
//     .select('*')
//     .eq('username', 'admin')
//     .single();

module.exports = supabase;
