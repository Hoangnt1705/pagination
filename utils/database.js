const mysql = require('mysql2');
const pool = mysql.createPool({host: 'localhost', user: 'root', password: 'Baitulong1@', database: 'db_blog'});
const db = pool.promise();
module.exports = db;
