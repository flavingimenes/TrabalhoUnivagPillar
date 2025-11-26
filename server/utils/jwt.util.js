const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'fallback_secret';

function signToken(payload, expiresIn = '1h') {
    return jwt.sign(payload, secret, { expiresIn });
}

function verifyToken(token) {
    return jwt.verify(token, secret);
}

module.exports = { signToken, verifyToken };
