// Ele incializa o servidor (src/index.js)
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

