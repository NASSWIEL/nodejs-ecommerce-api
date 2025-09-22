
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');


const { uploadMixOfImages } = require('../middlewares/uploadImageMiddleware');
const Product = require('../models/productModel');
const factory = require('./handlersFactory');



exports.uploadProductImages = uploadMixOfImages([
    { name: 'imageCover', maxCount: 1 },
    { name: 'images', maxCount: 5 }
]);

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
    // Image processing for imageCover
    if (req.files.imageCover) {
        const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-Cover.jpeg`;
        await sharp(req.files.imageCover[0].buffer)
            .resize(2000, 1333) // saved in memory storage as a buffer
            .toFormat('jpeg') // save to disk as
            .jpeg({ quality: 90 })
            .toFile(`uploads/products/${imageCoverFileName}`); // 90% quality

        req.body.imageCover = imageCoverFileName; // save image name to our DB
    }

    // Image processing for images
    if (req.files.images) {
        req.body.images = [];
        await Promise.all(
            req.files.images.map(async (img, index) => {
                const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
                await sharp(img.buffer)
                    .resize(2000, 1333) // saved in memory storage as a buffer
                    .toFormat('jpeg') // save to disk as
                    .jpeg({ quality: 90 })
                    .toFile(`uploads/products/${imageName}`); // 90% quality

                req.body.images.push(imageName); // save image name to our DB
            })
        );
    }

    console.log(req.body.imageCover);
    console.log(req.body.images);

    next();
});



// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = factory.getAll(Product, 'Product');



// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = factory.getOne(Product);

// @desc    Create product
// @route   POST  /api/v1/products
// @access  Private
exports.createProduct = factory.createOne(Product);

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateProduct = factory.updateOne(Product);

// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  Private

exports.deleteProduct = factory.deleteOne(Product);

