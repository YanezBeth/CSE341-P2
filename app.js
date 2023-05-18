// CSE341: Project 2. This is a home library database of my books
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const port = process.env.PORT || 8080;
const app = express();
//const cors = require('cors');

app
  //.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) //must be first 
  //.use(cors())
  .use(bodyParser.json())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, x-Requested-with, Content-Type, Accept, Z-Key'); // Allow CORS so I can test API on React
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/', require('./convey'));


mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });