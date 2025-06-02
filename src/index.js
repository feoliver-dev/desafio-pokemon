require('dotenv').config();
const express = require('express');
const connection = require('./db');

const app = express();
const PORT = process.env.PORT || 3006;

app.get('/', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT 1 + 1 AS result');
    res.json({ message: 'Conexão OK', result: rows[0].result });
  } catch (err) {
    res.status(500).json({ error: 'Erro na conexão com DB' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
