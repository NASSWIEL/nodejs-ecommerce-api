const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatrorMiddleware');



exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category ID format'),
    validatorMiddleware,
];


exports.createCategoryValidator = [
    check('name').notEmpty().withMessage('category name is required')
        .isLength({ min: 3 }).withMessage('Too short category name')
        .isLength({ max: 32 }).withMessage('Too long category name'),
    validatorMiddleware,
];


exports.udateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category ID format'),
    validatorMiddleware,

];


exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category ID format'),
    validatorMiddleware,

];
