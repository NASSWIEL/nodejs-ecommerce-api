const express = require('express');
const {
    signUpValidator,
    loginValidator,
} = require('../utils/validators/authValidator');

const {
    signUp,
    login,
    forgotPassword,
} = require('../services/authService');
const router = express.Router();


router.route('/signup').post(signUpValidator, signUp);
router.route('/login').post(loginValidator, login);
router.route('/forgetPassword').post(forgotPassword, login);



module.exports = router;