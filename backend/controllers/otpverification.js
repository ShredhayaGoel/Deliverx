
const pool = require("../db");

const otpverification = async (req, res) => {

    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required"
            });
        }

        console.log("Email received:", email);

        console.log("OTP received:", otp);

        const result = await pool.query(
            `SELECT otp_code, id
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
        const otpId = result.rows[0].id;


        const expiryResult = await pool.query(
            `SELECT expires_at <= CURRENT_TIMESTAMP AS expired
             FROM otp_verification
             WHERE id = $1`,
            [otpId]
        );

        if (expiryResult.rows[0].expired) {
            await pool.query(
                `DELETE FROM otp_verification WHERE id = $1`,
                [otpId]
            );

            return res.status(400).json({
                message: "OTP expired. Please request a new OTP."
            });
        }


        await pool.query(
            `DELETE FROM otp_verification WHERE id = $1`,
            [otpId]
        );


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