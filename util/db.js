const mysql = require('mysql2');
const util = require('util');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.SERVER,
    user: 'root',
    password: process.env.DB_password,
    database: 'todolist',
    multipleStatements: true
});

const queryPromise = util.promisify(connection.query).bind(connection);

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }

    console.log('Connected to the database');
});

connection.on('error', (err) => {
    console.error('Database connection error:', err);
});

connection.on('end', () => {
    console.log('Database connection ended');
});

module.exports = {
    connection,
    queryPromise
};
