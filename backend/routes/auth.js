import express from 'express';
import { generateAccessToken, authenticateToken } from '../utils/jwt.js';
import {Users} from '../db/mongodb.js';
import path from 'path';

const router = express.Router();

async function findUser(req, res, next) {
  console.log('findUser')
  try {
    const user = await Users.findOne({ username: req.body.username });
    if (user) {
      console.log(user)
      // password check
      if (user.password === req.body.password) {
        req.user = {
          name: user.name,
          username: user.username,
          email: user.email,
          _id: user._id,
        };
        next();
      }
      else {
        res.status(401).send({ message: 'Invalid Password' });
      }
      
    }
  } catch (error) {
    res.status(404).send({ message: error.message || 'User Not Found' })
  }
}


router.get('/login', authenticateToken, (req, res) => {
  console.log('Login page');
  res.sendFile('/login.html', { root: path.join(path.resolve(), 'public') });
});

router.post('/login', findUser, (req, res) => {
  res.json({ accessToken : generateAccessToken(req.user) });
});

router.post('/signup', async (req, res) => {
  try {
    const user = await Users.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(user);
    res.json({ accessToken : generateAccessToken({
      name: user.name,
      username: user.username,
      email: user.email,
      _id: user._id,
    }) });
  }
  catch (error) {
    res.status(400).send({ message: error.message || 'Invalid User Data' });
  }
});


export { router };
