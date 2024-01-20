require("dotenv").config()
const mysql = require('mysql2/promise');

const config ={
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
}

const createConnection = async () => { return await mysql.createConnection(config)};

module.exports = {createConnection}