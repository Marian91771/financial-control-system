// controllers/categories.controller.js
const Category = require('../models/category.model');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAll();
    return res.status(200).json(categories);
  } catch (err) {
    console.error('❌ Error fetching categories:', err);
    return res.status(500).json({ error: 'Database error' });
  }
};

const postCategory = async (req, res) => {
  const { name } = req.query;
  try {
    const result = await Category.postCategory(name);
    return res.status(201).json({
      message: 'Category added',
      insertId: result.insertId
    });
  } catch (err) {
    console.error('❌ Error inserting category:', err);
    return res.status(500).json({ error: 'Database error' });
  }
};

const updateCategory = async (req, res) => {
  const { id }   = req.params;
  const { name } = req.query;
  try {
    const result = await Category.updateCategory(id, name);
    return res.status(200).json({
      message: 'Category updated',
      affectedRows: result.affectedRows
    });
  } catch (err) {
    console.error('❌ Error updating category:', err);
    return res.status(500).json({ error: 'Database error' });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Category.deleteCategory(id);
    return res.status(200).json({
      message: 'Category deleted',
      affectedRows: result.affectedRows
    });
  } catch (err) {
    console.error('❌ Error deleting category:', err);
    return res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  getAllCategories,
  postCategory,
  updateCategory,
  deleteCategory,
};
