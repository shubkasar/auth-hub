// const {Pool} = require('pg');
const {Sequelize} = require('sequelize');
const fs = require('fs');
require('dotenv').config();

const logStream = fs.createWriteStream('./logs/sequeliza.log',{flags: 'a'});

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    // logging: (msg) => logStream.write(msg + '\n')
    logging: false
});

// module.exports = pool;
module.exports = sequelize;