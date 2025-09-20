const express = require('express');
const { getCategoryValidator, createCategoryValidator, udateCategoryValidator, deleteCategoryValidator } = require('../utils/validators/categortValidator');




const { getCategories, createCategory, getCategory, updateCategory, deleteCategory } = require('../services/categoryService');
const router = express.Router();

router.route('/').get(getCategories).post(createCategoryValidator, createCategory);
router.route('/:id')
    .get(getCategoryValidator, getCategory)
    .put(udateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;