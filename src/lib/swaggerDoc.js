import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const router = express.Router();

const swaggerDefinition = {
  info: {
    title: 'Test Swagger',
    version: '1.0.0',
    description: 'Test Swagger document',
  },
  host: 'localhost:8080',
  basePath: '/',
  schema: 'http',
  produces: ['application/json'],
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  security: [{ jwt: [] }],
};

const options = {
  swaggerDefinition,
  apis: ['src/product/**/*.router.yaml'],
};

const swaggerSpec = swaggerJsDoc(options);

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default router;
