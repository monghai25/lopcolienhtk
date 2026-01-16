// Test DNS resolution
const dns = require('dns');

const hostname = 'db.fxbsvhdyilztynexwffq.supabase.co';

console.log('Testing DNS resolution for:', hostname);
console.log('');

dns.lookup(hostname, (err, address, family) => {
    if (err) {
        console.error('❌ DNS lookup failed:', err.message);
        console.error('');
        console.error('Possible causes:');
        console.error('1. No internet connection');
        console.error('2. Firewall blocking DNS');
        console.error('3. VPN/Proxy issues');
        console.error('4. DNS server problems');
        console.error('');
        console.error('Solutions:');
        console.error('- Check internet connection');
        console.error('- Try different network (mobile hotspot)');
        console.error('- Disable VPN temporarily');
        console.error('- Change DNS to 8.8.8.8 (Google DNS)');
    } else {
        console.log('✅ DNS resolution successful!');
        console.log('   IP Address:', address);
        console.log('   IP Family:', family === 4 ? 'IPv4' : 'IPv6');
        console.log('');
        console.log('DNS is working. The issue might be:');
        console.log('1. Password encoding (special characters)');
        console.log('2. Firewall blocking port 5432');
        console.log('3. SSL/TLS issues');
    }
});

// Also test with resolve
dns.resolve4(hostname, (err, addresses) => {
    if (err) {
        console.error('❌ DNS resolve4 failed:', err.message);
    } else {
        console.log('');
        console.log('All IP addresses:', addresses);
    }
});
