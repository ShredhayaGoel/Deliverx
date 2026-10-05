const pool = require("../db");
const { randomInt } = require("crypto");
const transporter = require("../mailer");

// user exists

const forgotpassword = async (req, res) => {
    try {
        const { email } = req.body;


        const result = await pool.query(`
            select * from users where email = $1    
            `, [email]);


        if (result.rows.length == 0) {
            return res.status(404).json({

                message: "user does not exists"
            });
        }
        const otp = randomInt(100000, 1000000);

        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        // DATABASE M SAVE OTP FOR VERIFICAION 

        await pool.query(`
    
   insert into otp_verification(
   email,otp_code,expires_at
   ) 
   values($1,$2,$3)
   `,
            [email, otp, expiresAt]
        )
        // EMAIL SEND

        const info = await transporter.sendMail({
            from: process.env.SENDGRID_FROM_EMAIL,
            to: email,
            subject: "Password Reset otp",
            text: `your otp is${otp}. It is valid for 5 minutes.`
        });
        console.log("EMAIL SENT:", info);
        return res.status(200).json({
            message: "OTP sent successfully"
        });

    }

    catch (error) {
        console.log("Forgot password error:", error);

        return res.status(500).json({
            message: "Internal server error"
        }
        )
    }
}
module.exports = forgotpassword;