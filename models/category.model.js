
const db = require('./db');

class Category {
 
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM categories');
    return rows;
  }

 
  static async postCategory(name) {
    const [result] = await db.query(
      'INSERT INTO categories (name) VALUES (?)',
      [name]
    );
    return result;
  }

 
  static async updateCategory(id, name) {
    const [result] = await db.query(
      'UPDATE categories SET name = ? WHERE id = ?',
      [name, id]
    );
    return result;
  }

  
  static async deleteCategory(id) {
    const [result] = await db.query(
      'DELETE FROM categories WHERE id = ?',
      [id]
    );
    return result;
  }
}

module.exports = Category;
