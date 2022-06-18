const mysql = require('mysql');
require('dotenv').config()
exports.con = mysql.createConnection({
    host: process.env.DB_HOST || "us-cdbr-east-05.cleardb.net",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USERNAME || "bf866bc64138a1",
    password: process.env.DB_PASSWORD || "06f5406c",
    database: process.env.DB_SCHEMA || "heroku_37bb97e0f5ae5b0"
  });
