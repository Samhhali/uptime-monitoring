const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: { type: String, unique: true },
    isVerified: { type: Boolean, default: false },
    password: String,
     passwordResetToken: String,
     passwordResetExpires: Date,
    }, schemaOptions);