var express = require('express');
var router = express.Router();

const signup = require("../controllers/signup");

const login = require("../controllers/login");

const forgotpassword = require("../controllers/forgotpassword");
const updatedPassword = require("../controllers/updatepassword");

router.post('/updatedpassword', updatedPassword);

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', signup);

router.post('/login', login);

router.post('/forgotpassword', forgotpassword);

router.post('/verifyotp', require("../controllers/otpverification"));
router.post('/resendotp', require("../controllers/resendotp"));
router.post('/updatedpassword', updatedPassword);

module.exports = router;
