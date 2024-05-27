import jwt from 'jsonwebtoken';
import { JWT_EXPIRATION_TIME } from '../constants/index.js';
function shortenToken(token) {
  if (!token) return token;
  return token.slice(0, 5) + '...' + token.slice(-5);
}


export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token:', shortenToken(token));
  if (token == null) return res.status(401).send({ error: 'Unauthenticated user' });
  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, user) => {
    if (err) {
      switch (err.name) {
        case 'TokenExpiredError':
          console.log('token expired');
          return res.status(401).send({ error: 'Token expired' });
        case 'JsonWebTokenError':
          console.log('invalid token');
          return res.status(401).send({ error: 'Invalid token' });
        default:
          console.log('unauthenticated user');
          return res.status(401).send({ error: 'Unauthenticated user' });
      }
    }
    console.log('user:', user);
    req.user = user;
    next();
  });
}


/**
 * 
 * @param {Object | String | Buffer} payload object to be signed
 * @returns 
 */
export function generateAccessToken(payload) {
  const options = {
    expiresIn: JWT_EXPIRATION_TIME,
  };
  return jwt.sign(payload, process.env.JWT_SECRET_TOKEN, options);
}