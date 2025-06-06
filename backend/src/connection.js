require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,      // "db" → nome do serviço MySQL no docker-compose
  user: process.env.DB_USER,      // ex.: "root"
  password: process.env.DB_PASSWORD,  // ex.: "root"
  database: process.env.DB_NAME   // ex.: "pokemon_db"
});

module.exports = pool;

