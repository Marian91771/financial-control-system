// tests/categories.test.js
const request = require('supertest');
const app = require('../app');
const Category = require('../models/category.model');

jest.mock('../models/category.model');

describe('Categories API', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /categories', () => {
    it('should return 200 and an array of categories', async () => {
      const fakeCats = [
        { id: 1, name: 'Cat A' },
        { id: 2, name: 'Cat B' },
      ];
      Category.getAll.mockResolvedValue(fakeCats);

      const res = await request(app).get('/categories');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(fakeCats);
      expect(Category.getAll).toHaveBeenCalledTimes(1);
    });

    it('should handle errors', async () => {
      Category.getAll.mockRejectedValue(new Error('DB failure'));

      const res = await request(app).get('/categories');

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Database error' });
    });
  });

  describe('POST /categories/new', () => {
    it('should add a category and return insertId', async () => {
      Category.postCategory.mockResolvedValue({ insertId: 42 });

      const res = await request(app)
        .post('/categories/new')
        .query({ name: 'NewCat' });

      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        message: 'Category added',
        insertId: 42,
      });
      expect(Category.postCategory).toHaveBeenCalledWith('NewCat');
    });

    it('should handle errors', async () => {
      Category.postCategory.mockRejectedValue(new Error('DB fail'));

      const res = await request(app)
        .post('/categories/new')
        .query({ name: 'X' });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Database error' });
    });
  });

  describe('PUT /categories/edit/:id', () => {
    it('should update a category and return success message', async () => {
      Category.updateCategory.mockResolvedValue({ affectedRows: 1 });

      const res = await request(app)
        .put('/categories/edit/5')
        .query({ name: 'Updated' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: 'Category updated' });
      expect(Category.updateCategory).toHaveBeenCalledWith('5', 'Updated');
    });

    it('should handle errors', async () => {
      Category.updateCategory.mockRejectedValue(new Error('Oops'));

      const res = await request(app)
        .put('/categories/edit/5')
        .query({ name: 'X' });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Database error' });
    });
  });

  describe('DELETE /categories/delete/:id', () => {
    it('should delete a category and return success message', async () => {
      Category.deleteCategory.mockResolvedValue({ affectedRows: 1 });

      const res = await request(app).delete('/categories/delete/7');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: 'Category deleted' });
      expect(Category.deleteCategory).toHaveBeenCalledWith('7');
    });

    it('should handle errors', async () => {
      Category.deleteCategory.mockRejectedValue(new Error('Err'));

      const res = await request(app).delete('/categories/delete/7');

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Database error' });
    });
  });
});
