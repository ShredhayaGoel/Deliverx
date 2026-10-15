const { randomInt } = require("crypto");

const pool = require("../db");
const transporter = require("../mailer");

const resendotp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }
        const userResult = await pool.query(
            "SELECT id FROM users WHERE email = $1"
            , [email]);


        if (userResult.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const otp = randomInt(100000, 1000000);

        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await pool.query("DELETE FROM otp_verification WHERE email = $1",
            [email]);

        await pool.query(`INSERT INTO otp_verification
     (email, otp_code, created_at, expires_at)
      VALUES ($1, $2, NOW(), $3)`,
            [email, otp, expiresAt]);

        await transporter.sendMail({
            from: process.env.SENDGRID_FROM_EMAIL,
            to: email,
            subject: "Your OTP Code",
            text: `Your new OTP is ${otp}. It expires in 5 minutes.`
        });

        return res.status(200).json({
            message: "New OTP sent successfully"
        });

    }
    catch (error) {
        console.error("Resend OTP error:", error);
        return res.status(500).json({
            message: "Failed to resend OTP"
        });
    }
}
module.exports = resendotp;