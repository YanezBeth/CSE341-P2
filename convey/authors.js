const express = require('express');
const router = express.Router();

const authorsController = require('../controllers/authors');

//GET all authors from the database
router.get('/', authorsController.getAuthors);
//GET by id
router.get('/:id', authorsController.oneAuthor);
//POST add author
router.post('/', authorsController.addAuthor);
//Update a field with PUT
router.put('/:id', authorsController.updateAuthor);
//DELETE route
router.delete('/:id', authorsController.deleteAuthor);


module.exports = router;