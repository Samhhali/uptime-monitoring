const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

require("dotenv/config");


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());



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
    var authRouter = require('./routes/auth');
    var checkRouter = require('./routes/check');
    var reportRouter = require('./routes/report');

    app.use('/', indexRouter);
    app.use('/auth', authRouter);
    app.use('/users', usersRouter);
    app.use('/check', checkRouter);
    app.use('/report', reportRouter);

module.exports = app;
