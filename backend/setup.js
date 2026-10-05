const pool = require("./db");
async function setup() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password  VARCHAR(255) NOT NULL,
          
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                   
            ) 
            `);
        await pool.query(`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS phone VARCHAR(20)
        `);

        await pool.query(`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS address TEXT
        `);

        console.log("Table created successfully");

        await pool.query(`CREATE TABLE IF NOT EXISTS  login_attempts(
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            IP_address VARCHAR(45) NOT NULL,
            attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP

        )`);

        console.log("login_attempts table created successfully");

        await pool.query(`CREATE TABLE IF NOT EXISTS  otp_verification(
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            otp_code VARCHAR(6) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            expires_at TIMESTAMP NOT NULL)`);

    }



    catch (error) {
        console.error("Error creating table:", error);
    }
    finally {
        pool.end();
    }
}
setup();