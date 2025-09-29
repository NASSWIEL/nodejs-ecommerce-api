const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatrorMiddleware');
const User = require('../../models/userModel');


//@desc   Signup 
// @route  POST /api/v1/auth/signup
// @access Public

exports.signUpValidator = [
    check('name')
        .notEmpty()
        .withMessage('User name is required')
        .isLength({ min: 3 })
        .withMessage('Too short user name')
        .custom((value, { req }) => {
            req.body.slug = slugify(value);
            return true;
        }),
    check('email')
        .notEmpty()
        .withMessage('User email is required')
        .isEmail()
        .withMessage('Invalid email address format')
        .custom((value) =>
            User.findOne({ email: value }).then((user) => {
                if (user) {
                    return Promise.reject(new Error('E-mail already exists'));
                }
            })
        ),
    check('password')
        .notEmpty()
        .withMessage('User password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    check('passwordConfirm')
        .notEmpty()
        .withMessage('Please confirm your password')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        }),
    validatorMiddleware,
];



//@desc   login 
// @route  POST /api/v1/auth/login
// @access Public

exports.loginValidator = [

    check('email')
        .notEmpty()
        .withMessage('User email is required')
        .isEmail()
        .withMessage('Invalid email address format'),


    check('password')
        .notEmpty()
        .withMessage('User password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    validatorMiddleware,
];













// exports.getUserValidator = [
//     check('id').isMongoId().withMessage('Invalid User id format'),
//     validatorMiddleware,
// ];

// exports.updateUserValidator = [
//     check('id').isMongoId().withMessage('Invalid User id format'),
//     body('name').optional().custom((value, { req }) => {
//         req.body.slug = slugify(value);
//         return true;
//     }),
//     body('email')
//         .optional()
//         .isEmail()
//         .withMessage('Invalid email address format'),
//     body('phone')
//         .optional()
//         .isMobilePhone([
//             'fr-FR', 'ar-YE'])
//         .withMessage('Please provide a valid phone number'),
//     body('role')
//         .optional()
//         .isIn(['user', 'admin'])
//         .withMessage('Role must be either user or admin'),
//     body('profileImage')
//         .optional(),

//     validatorMiddleware,
// ];


// exports.changeUserPasswordValidator = [
//     check('id').isMongoId().withMessage('Invalid User id format'),
//     body('currentPassword')
//         .notEmpty()
//         .withMessage('You must enter your current password'),
//     body('password')
//         .notEmpty()
//         .withMessage('You must enter new password')
//         .isLength({ min: 6 })
//         .withMessage('New password must be at least 6 characters long'),
//     body('passwordConfirm')
//         .notEmpty()
//         .withMessage('You must enter the password confirm')
//         .custom((value, { req }) => {
//             if (value !== req.body.password) {
//                 throw new Error('Password Confirmation incorrect');
//             }
//             return true;
//         }),
//     // Validate current password in a separate validation
//     body('currentPassword')
//         .custom(async (value, { req }) => {
//             const user = await User.findById(req.params.id);
//             if (!user) {
//                 throw new Error('There is no user for this id');
//             }
//             const isCorrectPassword = await bcrypt.compare(value, user.password);
//             if (!isCorrectPassword) {
//                 throw new Error('Incorrect current password');
//             }
//             return true;
//         }),
//     validatorMiddleware,
// ];


// exports.deleteUserValidator = [
//     check('id').isMongoId().withMessage('Invalid User id format'),
//     validatorMiddleware,
// ];