const express = require('express');
const router = express.Router();

const titlesController = require('../controllers/titles');
const validation = require('../middlemanware/validate');

const {
    auth,
    requiredScopes
} = require('express-oauth2-jwt-bearer');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
    audience: 'https://yanezproject2library.onrender.com',
    issuerBaseURL: `https://dev-qsfk08gwjpmuj0b4.us.auth0.com/`,
    tokenSigningAlg: 'HS256'
});

const checkScopes = requiredScopes('write:messages');


//Get all titles from the database
router.get('/', titlesController.getTitles);
//GET by id
router.get('/:id', titlesController.oneTitle);
//POST add book title
router.post('/', validation.saveTitle, titlesController.addTitle);
//Update a field with PUT
router.put('/:id', validation.saveTitle, titlesController.updateTitle);
//DELETE route
router.delete('/:id', checkJwt, checkScopes, titlesController.deleteTitle);


module.exports = router;