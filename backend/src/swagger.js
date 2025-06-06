const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Pokémons',
      version: '1.0.0',
      description: 'Documentação da API de Pokémons com rotas CRUD e batalha',
    },
    servers: [
      {
        url: 'http://localhost:3006',
        description: 'Servidor local',
      },
    ],
  },
  apis: [
    './src/routes/*.js'
  ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
