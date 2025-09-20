const { validationResult } = require('express-validator');

const validatorMiddleware =
    // middleware to catch error from rules if exists
    (req, res, next) => {
        // Find the validation errors in this request and wrap them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // to move to the next middleware or controller if no error
    };

module.exports = validatorMiddleware;