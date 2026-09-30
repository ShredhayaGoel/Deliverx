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
    }

    catch (error) {
        console.error("Error creating table:", error);
    }
    finally {
        pool.end();
    }
}
setup();