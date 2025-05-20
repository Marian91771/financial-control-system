
const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/categories.controller');

router.get('/',             ctrl.getAllCategories);
router.post('/new',         ctrl.postCategory);
router.put('/edit/:id',     ctrl.updateCategory);
router.delete('/delete/:id',ctrl.deleteCategory);

module.exports = router;
