const db = require('../models/db');

exports.getReport = async (req, res) => {
    try {
        const { date, startDate, endDate, categoryId, userId, minAmount, maxAmount } = req.query;

        const queryParts = [];
        const params = [];

        if (userId) {
            queryParts.push("t.user_id = ?");
            params.push(parseInt(userId)); // Ensure userId is treated as a number
        }

        if (date) {
            queryParts.push('DATE(t.date) = ?');
            params.push(date);
        }

        if (startDate && endDate) {
            queryParts.push('DATE(t.date) BETWEEN ? AND ?');
            params.push(startDate, endDate);
        }

        if (categoryId) {
            queryParts.push("t.category_id = ?");
            params.push(parseInt(categoryId)); // Ensure categoryId is treated as a number
        }

        if (minAmount) {
            queryParts.push("t.amount >= ?");
            params.push(parseFloat(minAmount)); // Ensure minAmount is treated as a number
        }

        if (maxAmount) {
            queryParts.push("t.amount <= ?");
            params.push(parseFloat(maxAmount)); // Ensure maxAmount is treated as a number
        }

        const whereClause = queryParts.length ? 'WHERE ' + queryParts.join(' AND ') : '';

        const query = `
            SELECT
                t.id,
                t.amount,
                t.date,
                t.note,
                u.name AS user_name, 
                c.name AS category_name
            FROM transactions t
            JOIN categories c ON t.category_id = c.id
            JOIN users u ON t.user_id = u.id
            ${whereClause}
            ORDER BY t.date DESC
        `;

        console.log('Generated Query:', query);
        console.log('Query Parameters:', params);

        const rows = await db.query(query, params);

        res.json(rows);
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message }); // Include error message for more details
    }
};

module.exports = exports;