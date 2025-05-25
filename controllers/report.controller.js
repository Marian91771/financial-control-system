const db = require('../config/db.config');

exports.getReport = async (req, res) => {
  try {
    const { date, startDate, endDate, categoryId, userId, minAmount, maxAmount } = req.query;

    const queryParts = [];
    const params = [];

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
    queryParts.push(`"user_id" = ?`);
    params.push(userId);

    if (date) {
      queryParts.push(`DATE("date") = ?`);
      params.push(date);
    }

    if (startDate && endDate) {
      queryParts.push(`DATE("date") BETWEEN ? AND ?`);
      params.push(startDate, endDate);
    }

    if (categoryId) {
      queryParts.push(`"category_id" = ?`);
      params.push(categoryId);
    }

    if (minAmount) {
      queryParts.push(`amount >= ?`);
      params.push(minAmount);
    }

    if (maxAmount) {
      queryParts.push(`amount <= ?`);
      params.push(maxAmount);
    }

    const whereClause = queryParts.length ? 'WHERE ' + queryParts.join(' AND ') : '';

    const query = `
      SELECT 
        t.id, t.amount, t.date, t.description, 
        c.name AS category_name, 
        c.type AS category_type
      FROM transactions t
      JOIN categories c ON t.category_id = c.id
      ${whereClause}
      ORDER BY t.date DESC
    `;

    const { rows } = await db.query(query, params);

    res.json(rows);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};