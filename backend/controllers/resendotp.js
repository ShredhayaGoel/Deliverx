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

        // 2. Check the existing resend limit record
        const limitResult = await pool.query(
            `SELECT window_started_at, request_count
             FROM otp_resend_limits
             WHERE email = $1`,
            [email]
        );

        if (limitResult.rows.length === 0) {
            // First resend request for this email
            await pool.query(
                `INSERT INTO otp_resend_limits
                 (email, window_started_at, request_count, last_requested_at)
                 VALUES ($1, NOW(), 1, NOW())`,
                [email]
            );
        } else {
            const limit = limitResult.rows[0];

            const windowExpired =
                Date.now() -
                new Date(limit.window_started_at).getTime()
                >= 15 * 60 * 1000;

            if (!windowExpired && limit.request_count >= 3) {
                return res.status(429).json({
                    message: "OTP resend limit reached. Try again after 15 minutes."
                });
            }

            if (windowExpired) {
                // Start a new 15-minute window
                await pool.query(
                    `UPDATE otp_resend_limits
                     SET window_started_at = NOW(),
                         request_count = 1,
                         last_requested_at = NOW()
                     WHERE email = $1`,
                    [email]
                );
            } else {
                // Increase the existing count
                await pool.query(
                    `UPDATE otp_resend_limits
                     SET request_count = request_count + 1,
                         last_requested_at = NOW()
                     WHERE email = $1`,
                    [email]
                );
            }
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