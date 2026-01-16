// Test Supabase connection
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const schema = process.env.DB_SCHEMA || 'lopcolien';

console.log('=== TESTING SUPABASE CONNECTION ===\n');
console.log('SUPABASE_URL:', supabaseUrl ? 'Found ✅' : 'Missing ❌');
console.log('SUPABASE_ANON_KEY:', supabaseKey ? 'Found ✅' : 'Missing ❌');
console.log('DB_SCHEMA:', schema);
console.log('\n');

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing environment variables!');
    console.error('Please check your .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
    db: {
        schema: schema
    }
});

(async () => {
    try {
        // Test 1: Basic connection
        console.log('Test 1: Basic connection...');
        const { data, error } = await supabase
            .from('users')
            .select('count')
            .limit(1);
        
        if (error) {
            console.error('❌ Connection failed:', error.message);
            throw error;
        }
        
        console.log('✅ Connected to Supabase!');
        console.log('');

        // Test 2: Count users
        console.log('Test 2: Checking users table...');
        const { count: userCount, error: countError } = await supabase
            .from('users')
            .select('*', { count: 'exact', head: true })
            .eq('del', 0);
        
        if (countError) throw countError;
        
        console.log('✅ Users table found!');
        console.log('   Total users:', userCount);
        console.log('');

        // Test 3: Check admin user
        console.log('Test 3: Checking admin user...');
        const { data: admin, error: adminError } = await supabase
            .from('users')
            .select('id, username, password, role, fullname')
            .eq('username', 'admin')
            .eq('del', 0);
        
        if (adminError) throw adminError;
        
        if (admin && admin.length > 0) {
            console.log('✅ Admin user found!');
            console.log('   ID:', admin[0].id);
            console.log('   Username:', admin[0].username);
            console.log('   Password:', admin[0].password);
            console.log('   Role:', admin[0].role);
            console.log('   Fullname:', admin[0].fullname);
        } else {
            console.log('❌ Admin user NOT found!');
            console.log('   Please run database/run_all.sql in Supabase SQL Editor');
        }
        console.log('');

        // Test 4: Check emotions table
        console.log('Test 4: Checking emotions table...');
        const { count: emotionCount, error: emotionError } = await supabase
            .from('emotions')
            .select('*', { count: 'exact', head: true })
            .eq('del', 0);
        
        if (emotionError) throw emotionError;
        
        console.log('✅ Emotions table found!');
        console.log('   Total emotions:', emotionCount);
        console.log('');

        console.log('=== ALL TESTS PASSED ✅ ===\n');
        console.log('You can now run: npm start\n');
        console.log('Then visit: http://localhost:3000');
        console.log('Login: admin / admin123\n');
        
        process.exit(0);
    } catch (err) {
        console.error('\n❌ ERROR:', err.message);
        console.error('\nFull error:');
        console.error(err);
        console.error('\n=== TROUBLESHOOTING ===');
        console.error('1. Check SUPABASE_URL and SUPABASE_ANON_KEY in .env file');
        console.error('2. Make sure you ran database/run_all.sql in Supabase SQL Editor');
        console.error('3. Check if schema "lopcolien" exists');
        console.error('4. Verify your Supabase project is active\n');
        
        process.exit(1);
    }
})();
