const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/apiError');
const factory = require('./handlersFactory');
const User = require('../models/userModel');

const generateToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
});


exports.signUp = asyncHandler(async (req, res, next) => {
    // create user
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });
    // generate new JWT token (data, secret key, options)
    const token = generateToken({ userId: user._id });
    // 201 code is for creation
    res.status(201).json({ data: user, token });
});



// @desc    Login
// @route   GET /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    // 1) check if password and email in the body (validation)
    // 2) check if user exist & check if password is correct
    const user = await User.findOne({ email: req.body.email });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new ApiError('Incorrect email or password', 401));
    }
    // 3) generate token
    const token = generateToken({ userId: user._id });

    // Delete password from response
    delete user._doc.password;
    // 4) send response to client side
    res.status(200).json({ data: user, token });
});




exports.protect = asyncHandler(async (req, res, next) => {
    // 1) Get token and check if it's there and if exists hold it
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization; // Bearer tokenString
        console.log(token);
    }
    if (!token) {
        return next(new ApiError('Heyyy, You are not logged in! Please log in to get access to this route', 401));
    }


    // 2) Verify token (no changes happend)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
        return next(new ApiError('The user belonging to this token no longer exists', 401));
    }
    // 4) Check if user changed password after the token was issued
    if (currentUser.passwordChangedAt) {
        const passwordChangedTimestamp = currentUser.passwordChangedAt.getTime() / 1000;
        // password chagned after token issued
        if (decoded.iat < passwordChangedTimestamp) {
            return next(new ApiError('User recently changed password! Please log in again', 401));
        }
    }

    req.user = currentUser;
    next();
}
);


