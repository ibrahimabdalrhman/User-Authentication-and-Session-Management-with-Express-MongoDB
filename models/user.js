const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "username is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "email is required"],
            minlength: 4,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);