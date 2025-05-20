const express = require('express');
const {
    getAllTransactions,
    postTransaction,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transactions.controller');

const router = express.Router();

router.get('/', getAllTransactions);
router.post('/new', postTransaction);
router.put('/edit/:id', updateTransaction);
router.delete('/delete/:id', deleteTransaction);

module.exports = router;
