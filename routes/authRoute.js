const express = require('express');
const {
    signUpValidator,
    loginValidator,
} = require('../utils/validators/authValidator');

const {
    signup,
    login,
    forgotPassword,
} = require('../services/authService');
const router = express.Router();


router.route('/signup').post(signUpValidator, signup);
router.route('/login').post(loginValidator, login);
router.route('/forgetPassword').post(forgotPassword);



module.exports = router;