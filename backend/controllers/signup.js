const bcrypt = require("bcrypt");
const pool = require("../db");

const signup = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            confirmpassword,
            phone,
            address
        } = req.body;

        if (password != confirmpassword) {
            return res.status(400).json({
                message: "password do not match"
            });
        }

        const existinguser = await pool.query(`
      select * from users where  email = $1       
            `,
            [email]);

        if (existinguser.rows.length > 0) {
            res.status(400).json({
                message: "email already registered"
            });
        }

        const hashpassword = bcrypt.hash(password, 10);


        const result = await pool.query(`

                         insert into users(name,email,password,phone,address)   
                    values($1,$2,$3,$4,$5) 
                     RETURNING id, name, email, phone, address, created_at
               `, [name, email, hashpassword, phone, address]);
        res.status(201).json({
            message: "user created successfully",
            user: result.rows[0]
        });

    }


    catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
module.exports = signup;