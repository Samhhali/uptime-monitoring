const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require("dotenv/config");


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    {
        promiseLibrary: require('bluebird'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,    
    }).then(() =>  console.log('DB Connection Successful'))
    .catch((err) => console.error(err));

//routes
    var indexRouter = require('./routes/index');
    var usersRouter = require('./routes/users');
    app.use('/', indexRouter);
    app.use('/users', usersRouter);


module.exports = app;
