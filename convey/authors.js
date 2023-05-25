const express = require('express');
const router = express.Router();

const authorsController = require('../controllers/authors');
const validation = require('../middlemanware/validate');

//GET all authors from the database
router.get('/', authorsController.getAuthors);
//GET by id
router.get('/:id', authorsController.oneAuthor);
//POST add author
router.post('/', validation.saveAuthor, authorsController.addAuthor);
//Update a field with PUT
router.put('/:id', validation.saveAuthor, authorsController.updateAuthor);
//DELETE route
router.delete('/:id', authorsController.deleteAuthor);


module.exports = router;