const express = require('express');
const router = express.Router();

//router.use('/', require('./swagger'));
router.use('/titles', require('./titles'));

module.exports = router;