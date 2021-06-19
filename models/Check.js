const mongoose = require('mongoose');

const checkSchema = new mongoose({
    name: String,
    url: String,
    protocol: String,
    path: String,
    port: String,
    webhook: {
        type: String,
        required: false,
    },
    timeout: {
        type: String,
        default: '5sec',    
        required: false,
    },
    interval: {
        type: String,
        default: '10min',
        required: false,
    },
    threshold: {
        type: String,
        default: '1 failure',
        required: false,
    },
    authentication:{
        required: false,
    },
    httpHeaders: {
        type: String,
        required: false,
    },
    assert:{
        type: String,
        required: false,
    },
    tags:{
        type: String,
        required: false,
    },
    ignoreSSL: Boolean,

})