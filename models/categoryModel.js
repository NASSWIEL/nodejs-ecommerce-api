const mongoose = require('mongoose');
// 1 - create schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: [true, 'Category name must be unique'],
        maxlength: [32, 'Category name must be at least 3 characters and at most 32 characters'],
        minlength: [3, 'Category name must be at least 3 characters and at most 32 characters']

    },
    slug: {
        type: String,
        lowercase: true,
    },
    image: String,

},
    { timestamps: true }
);

//2 - create model
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;