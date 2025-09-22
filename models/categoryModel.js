const mongoose = require('mongoose');
// 1- Create Schema
const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Category required'],
            unique: [true, 'Category must be unique'],
            minlength: [3, 'Too short category name'],
            maxlength: [32, 'Too long category name'],
        },
        // A and B => shopping.com/a-and-b
        slug: {
            type: String,
            lowercase: true,
        },
        image: String,
    },
    { timestamps: true }
);


const setUrl = (doc) => {
    // set full url for image
    if (doc.image) {
        const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
        doc.image = imageUrl;
    }
};

categorySchema.post('init', (doc) => {
    // set full url for image
    setUrl(doc);
});

categorySchema.post('save', (doc) => { // for create
    // set full url for image
    setUrl(doc);
});

// 2- Create model
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;