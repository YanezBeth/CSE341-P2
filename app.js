// CSE341: Project 2. This is a home library database of my books
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const port = process.env.PORT;
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) //must be first 
  .use(cors())
  .use(bodyParser.json()) //express deprecated bodyParser?
  .use(express.json()) // for parsing json
  .use(express.urlencoded({
    extended: true
  })) // for parsing 
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, x-Requested-with, Content-Type, Accept, Z-Key'); // Allow CORS so I can test API on React
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/', require('./convey'));


//from Brother Birch's code, catch all that keeps it running but logs the error
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});