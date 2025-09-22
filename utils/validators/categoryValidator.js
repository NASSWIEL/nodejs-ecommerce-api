const slugify = require('slugify');
const { check } = require('express-validator');
const { body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatrorMiddleware');


exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware,
];

exports.createCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Category required')
        .isLength({ min: 3 })
        .withMessage('Too short category name')
        .isLength({ max: 32 })
        .withMessage('Too long category name').custom((value, { req }) => { // to return a slug for the name in the body when update
            req.body.slug = slugify(value);
            return true;
        }),
    validatorMiddleware,
];

exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    body('name').optional().custom((value, { req }) => { // to return a slug for the name in the body when update
        req.body.slug = slugify(value);
        return true;
    }),
    validatorMiddleware,
];

exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware,
];