const mongoose = require('mongoose');

const authenticationSchema = new mongoose.Schema({
    username: String,
    password: String
})
const checkSchema = new mongoose.Schema({
    name: String,
    url: String,
    protocol: {
        type: String,
        enum: ['HTTP', 'HTTPS', 'TCP']
    },
    path: String,
    port: {
        type: Number,
        default:3000,
        required:false
    },
    webhook: {
        type: String,
        required: false,
    },
    timeout: {
        type: Number,
        default: 5,    //seconds
        required: false,
    },
    interval: {
        type: Number,
        default: 10,    //minutes
        required: false,
    },
    threshold: {
        type: Number,
        default: 1,   // 1failure
        required: false,
    },
    authentication:{
        type: [authenticationSchema],
        required: false,
    },
    httpHeaders: {
        type: [String],
        required: false,
    },
    assert:{
        type: String,
        required: false,
    },
    tags:{
        type: [String],
        required: false,
    },
    ignoreSSL: Boolean,

})

module.exports = mongoose.model('Check', checkSchema);