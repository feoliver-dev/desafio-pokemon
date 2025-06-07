// Ele incializa o servidor (src/index.js)
const app = require('./app');
const PORT = process.env.PORT || 3306;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

