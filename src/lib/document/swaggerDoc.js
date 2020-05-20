import swaggerJsDoc from 'swagger-jsdoc';

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

export default swaggerSpec;
