const express = require('express');
const router = express.Router();

const titlesController = require('../controllers/titles');

//Get all titles from the database
router.get('/', titlesController.getTitles);
//POST add book title
router.post('/', titlesController.addTitle);




module.exports = router;