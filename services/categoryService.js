const CategoryModel = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

//@desc Get all categories  
//@route /api/v1/categories
//access public
exports.getCategories = asyncHandler(async (req, res) => {
    const categories = await CategoryModel.find({});
    res.status(200).json({ results: categories.length, data: categories });
});


//@desc Create new category 
//@route /api/v1/categories
//access private    
exports.createCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;

    const category = await CategoryModel.create({ name, slug: slugify(name) });
    res.status(201).json({ data: category });




});