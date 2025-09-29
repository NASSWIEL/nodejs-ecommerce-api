const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatrorMiddleware');
const User = require('../../models/userModel');

exports.createUserValidator = [
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
    check('profileImage')
        .optional(),
    check('phone')
        .optional()
        .isMobilePhone(['fr-FR', 'ar-YE'])
        .withMessage('Please provide a valid phone number'),
    check('role')
        .optional()
        .isIn(['user', 'admin'])
        .withMessage('Role must be either user or admin'),
    validatorMiddleware,
];

exports.getUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    validatorMiddleware,
];

exports.updateUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    body('name').optional().custom((value, { req }) => {
        req.body.slug = slugify(value);
        return true;
    }),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email address format'),
    body('phone')
        .optional()
        .isMobilePhone([
            'fr-FR', 'ar-YE'])
        .withMessage('Please provide a valid phone number'),
    body('role')
        .optional()
        .isIn(['user', 'admin'])
        .withMessage('Role must be either user or admin'),
    validatorMiddleware,
];

exports.deleteUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    validatorMiddleware,
];