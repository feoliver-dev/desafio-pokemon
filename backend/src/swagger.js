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
        url: process.env.BASE_URL || 'http://localhost:3006',
        description: 'Servidor local ou Docker',
      },
    ],
  },
  apis: ['./src/routes/**/*.js'], // Agora suporta subdiretórios dentro de "routes"
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;