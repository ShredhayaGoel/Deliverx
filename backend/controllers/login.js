const pool = require("../db");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        // user exists or not 

        const user = await pool.query(`
            select * from users where email = $1
            `,
            [email]);
        if (user.rows.length == 0) {
            console.log(user.rows);
            return res.status(401).json({
                message: 'user not exists'
            })
        }


        const storedpassword = user.rows[0].password;


        const passmatch = await bcrypt.compare(password, storedpassword);



        if (!passmatch) {
            const result = await pool.query(`
                insert into login_attempts(email,IP_address, attempt_time) values($1,$2,now())
                `, [email, req.ip]);

            return res.status(401).json({
                message: 'passwword do not match'
            });
        }

        return res.json({
            message: 'user found  succeessfully'
        });

    }
    catch (error) {

        console.log("error during login", error);
        return res.status(400).json({
            message: 'internal server error'
        });

    }
}

module.exports = login;