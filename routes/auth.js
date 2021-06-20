const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../config/settings');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');


router.post('/register', (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({ sucess: false, msg: 'Please pass email and password correctly' });
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password,
        });
        //save new user
        newUser.save((err) => {
            if (err) {
                return res.json({ sucess: false, msg: 'email already exists!' });
            }
            res.json({ sucess: true, msg: 'Successfully registered' })
        })
    }
})

router.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email,
    }, (err, user) => {
        if (err) throw err;

        if (!user) {
            res.status(401).send({ success: false, msg: 'Authentication failed. User not registered.' });
        } else {
            // check if password matches
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    //if user is found and password is correct , create a token
                    var token = jwt.sign(user.toJson(), config.secret);
                    //return info including token as JSON
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.status(401).send({ sucess: false, msg: 'Authentication failed. Wrong password.' })
                }
            })

        }
    }
    )
})

router.post('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    req.logOut();
    res.json({ sucess: true })
});

module.exports = router;