const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Yanez, CSE341. Week 5, Personal Project2. A personal libarary database.',
  },
  host: 'yanezproject2library.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./convey/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);