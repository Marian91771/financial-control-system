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
        // 1. Отримуємо стару транзакцію
        const [oldTransaction] = await db.query('SELECT * FROM transactions WHERE id = ?', [id]);
        if (!oldTransaction) return res.status(404).json({ error: 'Transaction not found' });

        // 2. Отримуємо користувача
        const [user] = await db.query('SELECT * FROM users WHERE id = ?', [oldTransaction.user_id]);
        if (!user) return res.status(404).json({ error: 'User not found' });

        let balance = parseFloat(user.balance);

        // 3. Відміняємо дію старої транзакції
        if (oldTransaction.type === 'income') {
            balance -= parseFloat(oldTransaction.amount);
        } else if (oldTransaction.type === 'expense') {
            balance += parseFloat(oldTransaction.amount);
        }

        // 4. Застосовуємо нову транзакцію
        if (type === 'income') {
            balance += parseFloat(amount);
        } else if (type === 'expense') {
            if (balance < amount) {
                return res.status(400).json({ error: 'Insufficient balance for update' });
            }
            balance -= parseFloat(amount);
        }

        // 5. Оновлюємо користувача
        await db.query('UPDATE users SET balance = ? WHERE id = ?', [balance, user.id]);

        // 6. Оновлюємо транзакцію
        await Transaction.update(id, { category_id, amount, type, note, date });

        res.status(200).json({ message: 'Transaction updated and balance adjusted' });
    } catch (err) {
        console.error('❌ Error updating transaction:', err);
        res.status(500).json({ error: 'Database error' });
    }
};


const deleteTransaction = async (req, res) => {
    const { id } = req.params;

    try {
        // 1. Отримуємо транзакцію
        const [transaction] = await db.query('SELECT * FROM transactions WHERE id = ?', [id]);
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });

        // 2. Отримуємо користувача
        const [user] = await db.query('SELECT * FROM users WHERE id = ?', [transaction.user_id]);
        if (!user) return res.status(404).json({ error: 'User not found' });

        let balance = parseFloat(user.balance);

        // 3. Відкочуємо дію транзакції
        if (transaction.type === 'income') {
            balance -= parseFloat(transaction.amount);
        } else if (transaction.type === 'expense') {
            balance += parseFloat(transaction.amount);
        }

        // 4. Оновлюємо баланс користувача
        await db.query('UPDATE users SET balance = ? WHERE id = ?', [balance, user.id]);

        // 5. Видаляємо транзакцію
        await Transaction.delete(id);

        res.status(200).json({ message: 'Transaction deleted and balance restored' });
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
