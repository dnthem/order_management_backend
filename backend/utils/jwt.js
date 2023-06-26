import jwt from 'jsonwebtoken';
import { shortenToken } from './utils.js';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token:', shortenToken(token));
  if (token == null) return res.status(401).send({ error: 'Unauthenticated user' });
  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, user) => {
    if (err) {
      console.log('err', err.message);
      return res.status(403).send({ error: err.message });
    }

    req.user = user;
    next();
  });
}

export function generateAccessToken(payload) {
  const options = {
    // expiresIn: '1h',
  };
  return jwt.sign(payload, process.env.JWT_SECRET_TOKEN, options);
}