const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../config/settings');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const nodemailer = require("../config/nodeMailer");
const router = express.Router();
const User = require('../models/User');


router.get('/', (req,res,next)=>{
    res.send('Auth api is running')
})
router.post('/register', (req, res) => {

    const token = jwt.sign({email: req.body.email}, config.secret)

    if (!req.body.email || !req.body.password) {
        res.json({ sucess: false, msg: 'Please pass email and password correctly' });
    } else {
        var newUser = new User({
            username: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmationCode: token 
        });
        //save new user
        newUser.save((err) => {
            if (err) {
                return res.json({ sucess: false, msg: 'email already exists!' });
            }
            res.json({ sucess: true, msg: 'User was registered successfully! Please check your email' });
            nodemailer.sendConfirmationEmail(
                user.username,
                user.email,
                user.confirmationCode,
            );
        })
    }
})

router.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email,
        // status: req.status,
    }, (err, user) => {
        if (err) throw err;
        //check if user is verified or not 
        if (user.status != "Active") {
            return res.status(401).send({success: false,msg: "Pending Account. Please Verify Your Email!",});
          }    
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

router.get('/confirm/:confirmationCode', (req, res, next) => {
    User.findOne({
      confirmationCode: req.params.confirmationCode,
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        user.status = "Active";
        user.save((err) => {
          if (err) {
            return res.status(500).send({ message: err });
          }
        });
      })
      .catch((e) => console.log("error", e));
  })
  

//router.get("/auth/confirm/:confirmationCode",verifyUser);


module.exports = router;
