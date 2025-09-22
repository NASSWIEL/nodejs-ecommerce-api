const multer = require('multer');
const ApiError = require('../utils/apiError');


const multerOptions = () => {
    const multerStorage = multer.memoryStorage();


    const multerFilter = (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true); // accept file
        } else {
            cb(new ApiError('Only Images are allowed.', 400), false); // reject file
        }
    };



    const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
    return upload;
}

exports.uploadSingleImage = (filename) => multerOptions().single(filename); // return middelware image



exports.uploadMixOfImages = (arrayOfFields) => multerOptions().fields(arrayOfFields); // return middelware images