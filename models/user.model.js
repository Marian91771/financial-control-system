//  Maks
const db = require('./db');

const User = function (user) {
    this.id = user.id;
};

User.getAll = async () => {
    const query = 'SELECT * FROM users';
    const rows = await db.query(query);
    return rows;
};

User.postUser = async (name, email) => {
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    const result = await db.query(query, [name, email]);
    return result;
};

User.deleteUser = async id => {
    const query = 'DELETE FROM users WHERE id = ?';
    const result = await db.query(query, [id]);
    return result;
};

module.exports = User;
