//  Maks
const User = require('../models/user.model');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.getAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

const postUser = async (req, res) => {
    const { name, email } = req.query;
    try {
        const result = await User.postUser(name, email);
        res.status(201).json({ message: 'User added', result });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await User.deleteUser(id);
        res.status(200).json({ message: 'User deleted successfully', result });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

module.exports = {
    getAllUsers,
    postUser,
    deleteUser,
};
