const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Pokemons',
      version: '1.0.0',
      description: 'Documentação da API de Pokemons',
    },
  },
  apis: ['./src/app.js'],  // ou o caminho onde estão suas rotas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;