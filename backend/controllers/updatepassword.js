
const bcrypt = require("bcrypt");
const pool = require("../db");

const updatedPassword = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        if (!email || !password || !confirmPassword) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "UPDATE users SET password = $1 WHERE email = $2 RETURNING id",
            [hashedPassword, email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            message: "Password updated successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

module.exports = updatedPassword;
