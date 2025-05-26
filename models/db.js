const mysql = require('mysql2/promise');
const config = require('../config/db.config');

async function query(sql, params) {
    let connection;
    try {
        connection = await mysql.createConnection(config.db);
        const [results] = await connection.execute(sql, params);
        return results;
    } catch (error) {
        console.error('Database query error:', error);
        throw error; // Прокидаємо помилку далі для обробки в контролері
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

module.exports = {
    query,
};