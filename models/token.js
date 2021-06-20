// const mongoose = require('mongoose');

// //When a user signs up, reate a verification token within Mongo
// const tokenSchema = new mongoose.Schema({
//     _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
//     token: { type: String, required: true },
//     createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
// })