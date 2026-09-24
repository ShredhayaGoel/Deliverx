// const mysql = require("mysql2/promise");


const mysql = require("mysql2/promise");
const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3307,
    database: "loginDB"

});

console.log("MySQL connection  created");

module.exports = database;