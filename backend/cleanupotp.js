
const pool = require("./db");

const deleteExpiredOTPs = async () => {
    try {
        const result = await pool.query(
            `DELETE FROM otp_verification
             WHERE expires_at <= CURRENT_TIMESTAMP`
        );

        if (result.rowCount > 0) {
            console.log(
                `${result.rowCount} expired OTP(s) deleted`
            );
        }
    } catch (error) {
        console.error("OTP cleanup error:", error);
    }
};

// Run every 1 minute
setInterval(deleteExpiredOTPs, 60 * 1000);

// Also check once when the server starts
deleteExpiredOTPs();

module.exports = deleteExpiredOTPs;