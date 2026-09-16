const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "PASSWORD",
    database: "loginDB"
});

console.log("MySQL connection pool created");

module.exports = db;