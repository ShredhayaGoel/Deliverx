const randomInt = require('crypto');

const pool = require("../db");
const transporter = require("../mailer");

const resendotp = (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "Email is required"
        });
    }
}