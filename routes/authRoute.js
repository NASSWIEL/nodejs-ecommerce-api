const express = require('express');
const {
    signUpValidator,
    loginValidator,
} = require('../utils/validators/authValidator');

const {
    signUp,
    login,
} = require('../services/authService');
const router = express.Router();


router.route('/signup').post(signUpValidator, signUp);
router.route('/login').post(loginValidator, login);

// router
//     .route('/:id')
//     .get(getUserValidator, getUser)
//     .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
//     .delete(deleteUserValidator, deleteUser);

module.exports = router;