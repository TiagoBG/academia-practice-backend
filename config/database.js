const mysql = require('mysql2');
require('dotenv').config();

//create the connection to database
const connection_mysql = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

module.exports = {
    cnn_mysql: connection_mysql
}