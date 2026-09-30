var express = require('express');
var router = express.Router();

const signup = require("../controllers/signup");
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', signup);

module.exports = router;
