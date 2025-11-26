require('dotenv').config();
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'pillar',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3308,
    connectionLimit: 5
});

module.exports = pool;
