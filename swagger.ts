import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'Documentação da API do sistema',
    contact: {
      name: 'Equipe de Desenvolvimento',
      email: 'dev@example.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desenvolvimento'
    }
  ]
};

const options = {
  swaggerDefinition,
  // Caminho para os arquivos de definição de rota
  apis: ['./routes/*.js'],  // Ajuste o caminho de acordo com o seu projeto
};

const swaggerDocs = swaggerJsdoc(options);

export { swaggerDocs, swaggerUi };
