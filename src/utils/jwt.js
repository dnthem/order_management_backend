import jwt from 'jsonwebtoken';
import { JWT_EXPIRATION_TIME } from '../constants/index.js';
function shortenToken(token) {
  if (!token) return token;
  return token.slice(0, 5) + '...' + token.slice(-5);
}

export function authenticateToken(req, res, next) {
  let error = null;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token:', shortenToken(token));
  if (token === null) {
    error = new Error('Unauthenticated user');
    error.status = 401;
    return next(error);
  }
  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, user) => {
    if (err) {
      err.status = 401;
      return next(err);
    }
    req.user = user;
    next();
  });
}


/**
 * 
 * @param {Object | String | Buffer} payload object
 * @returns 
 */
export function generateAccessToken(payload) {
  const options = {
    expiresIn: JWT_EXPIRATION_TIME,
  };
  return jwt.sign(payload, process.env.JWT_SECRET_TOKEN, options);
}