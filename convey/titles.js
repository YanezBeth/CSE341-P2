const express = require('express');
const router = express.Router();

const titlesController = require('../controllers/titles');

//Get all titles from the database
router.get('/', titlesController.getTitles);
//GET by id
router.get('/:id', titlesController.oneTitle);
//POST add book title
router.post('/', titlesController.addTitle);
//Update a field with PUT
router.put('/:id', titlesController.updateTitle);
//DELETE route
router.delete('/:id', titlesController.deleteTitle);


module.exports = router;