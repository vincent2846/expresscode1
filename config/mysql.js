const mysql = require('mysql');

const  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'eduwork-cruds'
});

// connection.connect();
module.exports = connection