const swaggerJSDoc = require('swagger-jsdoc')
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Defina as opções do Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuários',
      version: '1.0.0',
      description: 'Documentação da API de Usuários utilizando Prisma e Express',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/controllers/*.ts'], // Caminho dos arquivos que contêm os endpoints
};

// Gerar a especificação do Swagger
const swaggerSpec = swaggerJSDoc(options);

// Configuração para exibir a documentação Swagger
export const swaggerDocs = (app: Express, port: number) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Redirecionar a raiz para o Swagger UI
  app.get('/', (req, res) => {
    res.redirect('/api-docs');
  });

  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
};
