const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Ping = require('ping-monitor');
const mailer = require('./mailer');
const Check = require('../models/Check');



/* GET checks listing. */
router.get('/test', function(req, res, next) {
  res.send('respond with a check');
});

Check.forEach(function (check) {

  let monitor = new Ping ({
    website: check.url,
    interval: check.interval
  });


  monitor.on('up', function (res) {
      console.log('Yay!! ' + res.website + ' is up.');
  });


  monitor.on('down', function (res) {
      mailer.sendEmail({
        subject: res.website + ' is down',
        body: '<p>Time: ' + monitor.getFormatedDate(res.time) + '</p><p>Website: ' + res.website + ' </p><p>Message: ' + res.statusMessage + ' </p>'
      },
      function (err, message) {
        if (err) {
          console.error(err.message);
        }
        else {
          console.log(res.website + ' is down. Email sent!');
        }
      });
  });


  monitor.on('error', function (res) {
      mailer.sendEmail({
        subject: res.website + ' is down',
        body: '<p>Time: ' + monitor.getFormatedDate(res.time) + '</p><p>Website: ' + res.website + ' </p><p>Message: ' + res.statusMessage + ' </p>'
      },
      function (err, message) {
        if (err) {
          console.error(err.message);
        }
        else {
          console.log(res.website + ' is down. Email sent!');
        }
      });
  });


  monitor.on('stop', function (check) {
      console.log(check + ' monitor has stopped.');
  });

  Check.push(monitor);
});


// start monitoring servers
pingServers();

module.exports = router;
