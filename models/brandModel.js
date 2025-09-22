const mongoose = require('mongoose');
// 1- Create Schema
const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Brand required'],
            unique: [true, 'Brand must be unique'],
            minlength: [3, 'Too short Brand name'],
            maxlength: [32, 'Too long Brand name'],
        },
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
        const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
        doc.image = imageUrl;
    }
};

brandSchema.post('init', (doc) => {
    // set full url for image
    setUrl(doc);
});

brandSchema.post('save', (doc) => { // for create
    // set full url for image
    setUrl(doc);
});

// 2- Create model
module.exports = mongoose.model('Brand', brandSchema);