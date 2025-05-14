const db = require('./db');

const Category = function(cat) {
  this.id   = cat.id;
  this.name = cat.name;
};

Category.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM categories');
  return rows;
};

Category.postCategory = async (name) => {
  const [result] = await db.query(
    'INSERT INTO categories (name) VALUES (?)',
    [name]
  );
  return result;  
};

Category.updateCategory = async (id, name) => {
  const [result] = await db.query(
    'UPDATE categories SET name = ? WHERE id = ?',
    [name, id]
  );
  return result;
};

Category.deleteCategory = async (id) => {
  const [result] = await db.query(
    'DELETE FROM categories WHERE id = ?',
    [id]
  );
  return result;
};

module.exports = Category;
