const asyncHandler = require('express-async-handler');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../utils/apiError');
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');
const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');


// Upload single image
exports.uploadUserImage = uploadSingleImage('profileImage');


// image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
    const filename = `user-${uuidv4()}-${Date.now()}.jpeg`
    if (req.file) {
        await sharp(req.file.buffer).resize(600, 600) //saved in memeory storage as a buffer
            .toFormat('jpeg') // save to disk as 
            .jpeg({ quality: 90 }).toFile(`uploads/users/${filename}`); //90% quality

        req.body.profileImage = filename; // save image name to our DB
    }
    next();
});




// @desc    Get list of users
// @route   GET /api/v1/users
// @access  provate
exports.getUsers = factory.getAll(User);

// @desc    Get specific user by id
// @route   GET /api/v1/user/:id
// @access  private
exports.getUser = factory.getOne(User);
// @desc    Create user
// @route   POST  /api/v1/users
// @access  Private
exports.createUser = factory.createOne(User);

// @desc    Update specific user
// @route   PUT /api/v1/users/:id
// @access  Private

exports.updateUser = asyncHandler(async (req, res, next) => {
    const document = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            slug: req.body.slug,
            phone: req.body.phone,
            email: req.body.email,
            profileImage: req.body.profileImage,
            role: req.body.role,
        },
        {
            new: true,
        }
    );

    if (!document) {
        return next(new ApiError(`No document for this id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
});

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
    const document = await User.findByIdAndUpdate(
        req.params.id,
        {
            password: await bcrypt.hash(req.body.password, 12),
            passwordChangedAt: Date.now(),
        },
        {
            new: true,
        }
    );

    if (!document) {
        return next(new ApiError(`No document for this id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
});





// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private

exports.deleteUser = factory.deleteOne(User);
