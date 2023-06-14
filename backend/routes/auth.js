import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import {db} from '../db.js';
import path from 'path';

const router = express.Router();

function generateAccessToken(username) {
  // expires after midnight
  // const expireAt = Math.floor(Date.now() / 1000) + (60 * 60 * 24);
  return jwt.sign({ username }, process.env.JWT_SECRET_TOKEN);
}



router.get('/login', (req, res) => {
  console.log('Login page');
  res.sendFile('/login.html', { root: path.join(path.resolve(), 'public') });
});

router.post('/login', (req, res) => {
  res.json({ accessToken : generateAccessToken(req.body.username) });
});


export { router };
