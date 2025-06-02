require('dotenv').config();
const connection = require('./src'); // ajuste se db.js estiver em outra pasta

async function testConnection() {
  try {
    const [rows] = await connection.query('SELECT 1 + 1 AS result');
    console.log('✅ Conexão bem-sucedida!');
    console.log('Resultado:', rows);
  } catch (err) {
    console.error('❌ Erro na conexão:', err);
  }
}

testConnection();


