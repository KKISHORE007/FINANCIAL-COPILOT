const mysql = require('mysql2/promise');
require('dotenv').config();

// Create pool using single connection URL
const pool = mysql.createPool(process.env.DATABASE_URL);

module.exports = pool;
