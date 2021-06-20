var express = require('express');
var router = express.Router();

/* GET reports listing. */
router.get('/report', function(req, res, next) {
  res.send('respond with a report');
});

module.exports = router;
