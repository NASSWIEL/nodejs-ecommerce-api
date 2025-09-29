const mongoose = require('mongoose');
const slugify = require('slugify');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'User name is required'],
            trim: true,
        },
        slug: {
            type: String,
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, 'User email is required'],
            unique: true,
            lowercase: true,
        },
        phone: String,
        profileImage: String,
        password: {
            type: String,
            required: [true, 'User password is required'],
            minlength: [6, 'Too short user password'],
        },
        active: {
            type: Boolean,
            default: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        }
        ,
    },
    { timestamps: true }
);

// Mongoose middlewares 
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    //hashing the password (encryption)
    this.password = await bcrypt.hash(this.password, 12);
    next();
});



const User = mongoose.model('User', userSchema);
module.exports = User;