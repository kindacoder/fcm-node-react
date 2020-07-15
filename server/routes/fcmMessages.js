var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('this is the default and get route to fcm-messages');
});




module.exports = router;
