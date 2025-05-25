const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/report', async (req, res) => {
  try {
    const { date, startDate, endDate, categoryId, userId, minAmount, maxAmount } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const queryParts = [`t."user_id" = ?`];
    const params = [userId];

    // Фільтр по точній даті
    if (date) {
      queryParts.push(`DATE(t."date") = ?`);
      params.push(date);
    }

    // Фільтр по діапазону дат
    if (startDate && endDate) {
      queryParts.push(`DATE(t."date") BETWEEN ? AND ?`);
      params.push(startDate, endDate);
    }

    // Фільтр по категорії
    if (categoryId) {
      queryParts.push(`t."category_id" = ?`);
      params.push(categoryId);
    }

    // Фільтр по мінімальній сумі
    if (minAmount) {
      queryParts.push(`t."amount" >= ?`);
      params.push(minAmount);
    }

    // Фільтр по максимальній сумі
    if (maxAmount) {
      queryParts.push(`t."amount" <= ?`);
      params.push(maxAmount);
    }

    const whereClause = queryParts.length ? 'WHERE ' + queryParts.join(' AND ') : '';

    const query = `
      SELECT 
        t.id, t.amount, t.date, t.description, 
        c.name as category_name, 
        c.type as category_type
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
});

module.exports = router;
