const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Product title is required'],
            trim: true,
            minlength: [3, 'Too short product title'],
            maxlength: [100, 'Too long product title'],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
            minlength: [10, 'Too short product description'],
        },
        quantity: {
            type: Number,
            required: [true, 'Product quantity is required'],
        },
        sold: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
            trim: true,
            max: [2000000, 'Too long product price'],
        },
        priceAfterDiscount: {
            type: Number,
        },
        colors: [String],

        imageCover: {
            type: String,
            required: [true, 'Product image cover is required'],
        },
        images: [String],
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: [true, 'Product must belong to a category'],
        },
        subCategories: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'SubCategory',
            },
        ],
        brand: {
            type: mongoose.Schema.ObjectId,
            ref: 'Brand',
        },
        ratingsAverage: {
            type: Number,
            min: [1, 'Rating must be above or equal 1.0'],
            max: [5, 'Rating must be below or equal 5.0'],
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);