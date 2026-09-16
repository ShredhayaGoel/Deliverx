const mysql = require("mysql2/promise");

async function createConnection() {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            port: 3306, // match your actual MySQL port
            database: "loginDB"
        });
        console.log("MySQL connection created");
        return connection;
    } catch (err) {
        console.error("Failed to connect to MySQL:", err.message);
        throw err;
    }
}

module.exports = createConnection();