const express = require('express');
const CategoryModel = require('../models/categoryModel');
const { getCategories, createCategory } = require('../services/categoryService');
const router = express.Router();

router.route('/').get(getCategories).post(createCategory);


module.exports = router;