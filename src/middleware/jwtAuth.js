const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// Set up Auth0 configuration
const authConfig = {
    domain: process.env.AUTH0_DOMAIN,
    audience: process.env.AUTH0_AUDIENCE,
};

// Define middleware that validates incoming bearer tokens
// using JWKS from Auth0 domain
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
    }),

    credentialsRequired: false,
    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithm: ['RS256'],
});

module.exports = { checkJwt };
