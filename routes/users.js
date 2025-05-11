//  Maks
const express = require('express');
const { getAllUsers, postUser, deleteUser } = require('../controllers/users.controller');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/new', postUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;