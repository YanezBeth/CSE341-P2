const express = require('express');
const router = express.Router();

const titlesController = require('../controllers/titles');

//Get all titles from the database
router.get('/', titlesController.getTitles);




module.exports = router;