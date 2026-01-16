// Test với IP trực tiếp thay vì hostname
require('dotenv').config();
const dns = require('dns').promises;
const postgres = require('postgres');

(async () => {
    try {
        console.log('=== TESTING DIRECT IP CONNECTION ===\n');
        
        // Bước 1: Resolve hostname thủ công
        console.log('Step 1: Resolving hostname...');
        const hostname = 'db.fxbsvhdyilztynexwffq.supabase.co';
        
        try {
            const addresses = await dns.resolve4(hostname);
            console.log('✅ Resolved IPs:', addresses);
            
            // Thử kết nối với IP đầu tiên
            const ip = addresses[0];
            console.log('\nStep 2: Connecting with IP:', ip);
            
            const connectionString = `postgresql://postgres:Hoagphan%4012@${ip}:5432/postgres`;
            console.log('Connection string:', connectionString);
            
            const sql = postgres(connectionString, {
                ssl: 'require',
                connect_timeout: 30,
                onnotice: () => {}
            });
            
            console.log('\nStep 3: Testing connection...');
            const result = await sql`SELECT NOW() as now`;
            console.log('✅ Connected successfully!');
            console.log('Time:', result[0].now);
            
            await sql.end();
            
            console.log('\n=== SUCCESS ===');
            console.log('You can use this IP in .env:');
            console.log(`DATABASE_URL=postgresql://postgres:Hoagphan%4012@${ip}:5432/postgres`);
            
        } catch (dnsError) {
            console.error('❌ DNS resolution failed:', dnsError.message);
            console.log('\nTrying alternative method...');
            
            // Thử dùng getaddrinfo
            const { address } = await dns.lookup(hostname);
            console.log('✅ Found IP via lookup:', address);
            
            const connectionString = `postgresql://postgres:Hoagphan%4012@${address}:5432/postgres`;
            const sql = postgres(connectionString, {
                ssl: 'require',
                connect_timeout: 30,
                onnotice: () => {}
            });
            
            const result = await sql`SELECT NOW() as now`;
            console.log('✅ Connected successfully!');
            console.log('Time:', result[0].now);
            
            await sql.end();
            
            console.log('\nUse this in .env:');
            console.log(`DATABASE_URL=postgresql://postgres:Hoagphan%4012@${address}:5432/postgres`);
        }
        
    } catch (err) {
        console.error('\n❌ All methods failed:', err.message);
        console.error('\nThis means:');
        console.error('1. Node.js cannot resolve DNS (but browser can)');
        console.error('2. Possible Node.js DNS cache issue');
        console.error('3. Try restarting Node.js or computer');
        console.error('\nTry these commands:');
        console.error('- npm cache clean --force');
        console.error('- Delete node_modules and reinstall');
        console.error('- Restart computer');
    }
})();
