// Configurações gerais
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const pokemonRoutes = require('./routes/pokemonRoutes');
const batalhaRoutes = require('./routes/batalhaRoutes');

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/pokemons', pokemonRoutes);


app.use('/batalhar', batalhaRoutes);

//Assim, o backend permite que qualquer frontend faça requisições → inclusive o React em outra porta.
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000'
}));


// Middleware de erro genérico
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || 'Erro interno no servidor';
  res.status(status).json({ error: message });
}

app.use(errorHandler);

module.exports = app;

