// test-db.js
const db = require('./models/db');

(async () => {
    try {
        const [rows] = await db.query('SELECT 1+1 AS solution');
        console.log('✅ DB connection OK, result:', rows);
    } catch (err) {
        console.error('❌ DB connection failed:', err);
    } finally {
        process.exit();
    }
})();
