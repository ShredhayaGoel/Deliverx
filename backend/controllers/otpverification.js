
const pool = require("../db");

const otpverification = async (req, res) => {
    try {
        const { email, otp } = req.body;

        console.log("Email received:", email);
        console.log("OTP received:", otp);

        const result = await pool.query(
            `SELECT otp_code
       FROM otp_verification
       WHERE email = $1
       ORDER BY created_at DESC, id DESC
       LIMIT 1`,
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({
                message: "OTP not found for this email"
            });
        }

        const savedotp = result.rows[0].otp_code;

        if (String(savedotp) === String(otp)) {
            return res.status(200).json({
                message: "OTP matched"
            });
        }

        return res.status(400).json({
            message: "Invalid OTP"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = otpverification;
