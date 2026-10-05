var express = require('express');
var router = express.Router();

const signup = require("../controllers/signup");

const login = require("../controllers/login");

const forgotpassword = require("../controllers/forgotpassword");
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', signup);

router.post('/login', login);

router.post('/forgotpassword', forgotpassword);

module.exports = router;
