const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');
const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');


// Upload single image
exports.uploadCategoryImage = uploadSingleImage('image');


// image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
    // Check if file was uploaded
    if (!req.file) {
        return next(); // Skip image processing if no file uploaded
    }
    
    const filename = `category-${uuidv4()}-${Date.now()}.jpeg`
    await sharp(req.file.buffer).resize(600, 600) //saved in memeory storage as a buffer
        .toFormat('jpeg') // save to disk as 
        .jpeg({ quality: 90 }).toFile(`uploads/categories/${filename}`); //90% quality

    req.body.image = filename; // save image name to our DB

    next()
});




// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = factory.getAll(Category);

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = factory.getOne(Category);

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createCategory = factory.createOne(Category);

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = factory.updateOne(Category);

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private

exports.deleteCategory = factory.deleteOne(Category);

