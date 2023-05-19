const express = require('express');
const router = express.Router();

const authorsController = require('../controllers/authors');

//Get all titles from the database
router.get('/', authorsController.getAuthors);
//POST add author
router.post('/', authorsController.addAuthor);



module.exports = router;