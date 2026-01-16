// Test database connection
require('dotenv').config();
const postgres = require('postgres');

const connectionString = process.env.DATABASE_URL;
const schema = process.env.DB_SCHEMA || 'lopcolien';

console.log('=== TESTING DATABASE CONNECTION ===\n');
console.log('DATABASE_URL:', connectionString ? 'Found ✅' : 'Missing ❌');
console.log('DB_SCHEMA:', schema);
console.log('\n');

const sql = postgres(connectionString, {
    max: 10,
    ssl: 'require',
    onnotice: () => {}
});

(async () => {
    try {
        // Test 1: Basic connection
        console.log('Test 1: Basic connection...');
        const result = await sql`SELECT NOW() as now, version() as version`;
        console.log('✅ Connected!');
        console.log('   Time:', result[0].now);
        console.log('   Version:', result[0].version.split('\n')[0]);
        console.log('');

        // Test 2: Set schema
        console.log('Test 2: Setting schema...');
        await sql`SET search_path TO ${sql(schema)}`;
        console.log('✅ Schema set to:', schema);
        console.log('');

        // Test 3: Check users table
        console.log('Test 3: Checking users table...');
        const users = await sql`SELECT COUNT(*) as count FROM users WHERE del = 0`;
        console.log('✅ Users table found!');
        console.log('   Total users:', users[0].count);
        console.log('');

        // Test 4: Check admin user
        console.log('Test 4: Checking admin user...');
        const admin = await sql`
            SELECT id, username, password, role, fullname 
            FROM users 
            WHERE username = 'admin' AND del = 0
        `;
        
        if (admin.length > 0) {
            console.log('✅ Admin user found!');
            console.log('   ID:', admin[0].id);
            console.log('   Username:', admin[0].username);
            console.log('   Password:', admin[0].password);
            console.log('   Role:', admin[0].role);
            console.log('   Fullname:', admin[0].fullname);
        } else {
            console.log('❌ Admin user NOT found!');
            console.log('   Please run database/run_all.sql');
        }
        console.log('');

        // Test 5: Check emotions table
        console.log('Test 5: Checking emotions table...');
        const emotions = await sql`SELECT COUNT(*) as count FROM emotions WHERE del = 0`;
        console.log('✅ Emotions table found!');
        console.log('   Total emotions:', emotions[0].count);
        console.log('');

        console.log('=== ALL TESTS PASSED ✅ ===\n');
        console.log('You can now run: npm start\n');
        
        await sql.end();
        process.exit(0);
    } catch (err) {
        console.error('\n❌ ERROR:', err.message);
        console.error('\nFull error:');
        console.error(err);
        console.error('\n=== TROUBLESHOOTING ===');
        console.error('1. Check DATABASE_URL in .env file');
        console.error('2. Make sure you ran database/run_all.sql in Supabase');
        console.error('3. Check if schema "lopcolien" exists');
        console.error('4. Verify your Supabase password is correct\n');
        
        await sql.end();
        process.exit(1);
    }
})();
