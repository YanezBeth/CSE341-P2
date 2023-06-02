dotenv.config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SESSION_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
}


const app = express();
const { auth } = require('express-oauth2-jwt-bearer');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: '{yourApiIdentifier}',
  issuerBaseURL: `https://dev-qsfk08gwjpmuj0b4.us.auth0.com/`,
});

const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/titles', require('./titles'));
router.use('/authors', require('./authors'));

module.exports = router;