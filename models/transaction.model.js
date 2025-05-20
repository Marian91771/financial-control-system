const db = require('./db');

class Transaction {
    static async getAll() {
        return db.query('SELECT * FROM transactions');
    }

    static async create({ user_id, category_id, amount, type, note, date }) {
        const result = await db.query(
            'INSERT INTO transactions (user_id, category_id, amount, type, note, date) VALUES (?, ?, ?, ?, ?, ?)',
            [user_id, category_id, amount, type, note, date]
        );
        return result;
    }

    static async update(id, { category_id, amount, type, note, date }) {
        return db.query(
            'UPDATE transactions SET category_id = ?, amount = ?, type = ?, note = ?, date = ? WHERE id = ?',
            [category_id, amount, type, note, date, id]
        );
    }

    static async delete(id) {
        return db.query('DELETE FROM transactions WHERE id = ?', [id]);
    }
}

module.exports = Transaction;
