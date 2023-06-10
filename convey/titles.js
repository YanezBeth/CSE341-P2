const express = require('express');
const router = express.Router();
const axios = require('axios');
const titlesController = require('../controllers/titles');
const validation = require('../middlemanware/validate');

const {
    auth: oidcAuth
} = require('express-openid-connect');

// Configuration for express-openid-connect
const oidcConfig = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// Add the OpenID Connect middleware
router.use(oidcAuth(oidcConfig));

// Get all titles from the database
router.get('/', titlesController.getTitles);
// GET by id
router.get('/:id', titlesController.oneTitle);
// POST add book title
router.post('/', validation.saveTitle, titlesController.addTitle);
// Update a field with PUT
router.put('/:id', validation.saveTitle, titlesController.updateTitle);
// DELETE route
router.delete('/:id', titlesController.deleteTitle);

module.exports = router;