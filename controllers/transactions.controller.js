const Transaction = require('../models/transaction.model');
const db = require('../models/db');

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.getAll();
        res.status(200).json(transactions);
    } catch (err) {
        console.error('❌ Error fetching transactions:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

const postTransaction = async (req, res) => {
    const { user_id, category_id, amount, type, note, date } = req.body;

    if (!['income', 'expense'].includes(type)) {
        return res.status(400).json({ error: 'Invalid transaction type' });
    }

    try {
        const [user] = await db.query('SELECT * FROM users WHERE id = ?', [user_id]);

        if (!user) return res.status(404).json({ error: 'User not found' });

        let newBalance = parseFloat(user.balance);

        if (type === 'expense') {
            if (newBalance < amount) {
                return res.status(400).json({ error: 'Insufficient balance' });
            }
            newBalance -= parseFloat(amount);
        } else if (type === 'income') {
            newBalance += parseFloat(amount);
        }

        await db.query('UPDATE users SET balance = ? WHERE id = ?', [newBalance, user_id]);

        const result = await Transaction.create({ user_id, category_id, amount, type, note, date });
        res.status(201).json({ message: 'Transaction created', transactionId: result.insertId });
    } catch (err) {
        console.error('❌ Error creating transaction:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { category_id, amount, type, note, date } = req.body;

    try {
        const result = await Transaction.update(id, { category_id, amount, type, note, date });
        res.status(200).json({ message: 'Transaction updated', affectedRows: result.affectedRows });
    } catch (err) {
        console.error('❌ Error updating transaction:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

const deleteTransaction = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Transaction.delete(id);
        res.status(200).json({ message: 'Transaction deleted', affectedRows: result.affectedRows });
    } catch (err) {
        console.error('❌ Error deleting transaction:', err);
        res.status(500).json({ error: 'Database error' });
    }
};

module.exports = {
    getAllTransactions,
    postTransaction,
    updateTransaction,
    deleteTransaction,
};
