import express from 'express';
import { generateAccessToken, authenticateToken } from './jwt.js';
import {db} from '../db.js';
import path from 'path';

const router = express.Router();

function findUser(req, res, next) {
  const user = db.users.find((x) => x.username === req.body.username);
  if (user) {
    // password check
    if (user.password === req.body.password) {
      req.user = user;
      next();
    }
    else {
      res.status(401).send({ message: 'Invalid Password' });
    }
    
  }
  else {
    res.status(404).send({ message: 'User Not Found' });
  }
}


router.get('/login', authenticateToken, (req, res) => {
  console.log('Login page');
  res.sendFile('/login.html', { root: path.join(path.resolve(), 'public') });
});

router.post('/login', findUser, (req, res) => {
  res.json({ accessToken : generateAccessToken(req.user) });
});


export { router };
