const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,     // deve ser 'db' vindo do .env
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

module.exports = pool;

pool.getConnection()
  .then(conn => {
    console.log('Conectado ao MySQL com sucesso!');
    conn.release();
  })
  .catch(err => {
    console.error('Erro ao conectar ao MySQL:', err);
  });
