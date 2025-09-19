const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const ApiError = require('../utils/apiError');

//@desc Get all categories  
//@route /api/v1/categories
//access public
exports.getCategories = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1; // default page 1
    const limit = req.query.limit * 1 || 5; // default limit 5
    const skip = (page - 1) * limit;

    const categories = await Category.find({}).skip(skip).limit(limit);
    res.status(200).json({ results: categories.length, page, data: categories });
});


//@DESC get specific category by id
//@route /api/v1/categories/:id
//@access public 
exports.getCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
        return next(new ApiError(`No category for this id: ${id}`, 404));
    }
    res.status(200).json({ data: category });
});

//@desc Create new category 
//@route /api/v1/categories
//access private    
exports.createCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;

    const category = await Category.create({ name, slug: slugify(name) });
    res.status(201).json({ data: category });

});


//@DESC update specific category by id
//@route /api/v1/categories/:id
//@access private 
exports.updateCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findOneAndUpdate(
        { _id: id },
        { name, slug: slugify(name) },
        { new: true } // to return the category after update
    );
    if (!category) {
        return next(new ApiError(`No category for this id: ${id}`, 404));
    }
    res.status(200).json({ data: category });
});


//@DESC delete specific category by id
//@route /api/v1/categories/:id
//@access private 

exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        return next(new ApiError(`No category for this id: ${id}`, 404));
    }
    res.status(204).send();
});
