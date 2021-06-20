var express = require('express');
var router = express.Router();

/* GET checks listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a check');
});

module.exports = router;
