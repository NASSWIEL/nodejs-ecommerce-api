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


exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new ApiError('Please provide email and password', 400));
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new ApiError('Incorrect email or password', 401));
    }

    // 3) generate token 
    const token = generateToken({ userId: user._id });
    // 4) send response to client side
    res.status(200).json({ data: user, token });
    // 4) send response to client side

});