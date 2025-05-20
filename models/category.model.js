const db = require('./db');

class Category {
 
  static async getAll() {
    // Змінено: прибрано деструктуризацію [rows]
    // db.query вже повертає масив всіх категорій (якщо db.js повертає перший елемент з execute())
    const rows = await db.query('SELECT * FROM categories');
    return rows; // Тепер повернеться весь масив об'єктів категорій
  }

 
  static async postCategory(name) {
    // Змінено: прибрано деструктуризацію [result]
    const result = await db.query(
      'INSERT INTO categories (name) VALUES (?)',
      [name]
    );
    return result;
  }

 
  static async updateCategory(id, name) {
    // Змінено: прибрано деструктуризацію [result]
    const result = await db.query(
      'UPDATE categories SET name = ? WHERE id = ?',
      [name, id]
    );
    return result;
  }

  
  static async deleteCategory(id) {
    // Змінено: прибрано деструктуризацію [result]
    const result = await db.query(
      'DELETE FROM categories WHERE id = ?',
      [id]
    );
    return result;
  }
}

module.exports = Category;