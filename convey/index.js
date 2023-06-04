const { auth } = require('express-openid-connect');
const dotenv = require('dotenv');
dotenv.config();




const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  console.log(req.oidc.isAuthenticated());
  res.render('index', { 
    title: "Express Demo",
    isAuthenticated: req.oidc.isAuthenticated(),  });
  //res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


router.use('/titles', require('./titles'));
router.use('/authors', require('./authors'));

module.exports = router;