const { Schema, model } = require('mongoose');
const genderEnum = require('../enums/gender.enum');

const userSchema = new Schema({
    phoneNumber: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
    },
    birthDate: {
        type: Date,
    },
    gender: {
        type: String,
        enum: Object.values(genderEnum),
    },
    password: {
        type: String, // Contains hashed password
    },
    profilePicture: {
        type: String,
    }
}, {
    timestamps: true,
});

module.exports = model('user', userSchema);