
import postgres from 'postgres';

// Manually read .env for this test script if not passed via --env-file
// But assume we run with: node --env-file=.env test-connect.mjs

const url = process.env.POSTGRES_URL;

console.log('Checking POSTGRES_URL...');
if (!url) {
    console.error('ERROR: POSTGRES_URL is undefined.');
} else {
    // Hide password
    const safeUrl = url.replace(/:([^:@]+)@/, ':****@');
    console.log(`POSTGRES_URL found: ${safeUrl}`);
}

if (url) {
    console.log('Attempting connection...');
    const sql = postgres(url, { ssl: 'require', prepare: false, connect_timeout: 5 });
    
    try {
        const result = await sql`SELECT 1 as result`;
        console.log('Connection successful!', result);
        await sql.end();
    } catch (err) {
        console.error('Connection failed:', err);
        // Clean up
        await sql.end(); 
    }
}
