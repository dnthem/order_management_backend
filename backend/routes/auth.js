import express from 'express';
import { generateAccessToken, authenticateToken } from '../utils/jwt.js';
import {Users} from '../db/mongodb.js';
import path from 'path';
import bcrypt from 'bcrypt';

const router = express.Router();

async function findUser(req, res, next) {
  console.log('findUser')
  try {
    const user = await Users.findOne({ username: req.body.username });
    if (user) {
      console.log(user)
      // password check
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        req.user = {
          name: user.name,
          username: user.username,
          email: user.email,
          _id: user._id,
        };

        console.log('req.user', req.user);
        next();
      }
      else {
        res.status(401).send({ message: 'Username or Password is incorrect' });
      }
      
    }
  } catch (error) {
    res.status(404).send({ message: error.message || 'User Not Found' })
  }
}

async function checkExistingUser(req, res, next) {
  console.log('checkExistingUser')
  try {
    const user = await Users.findOne({ username: req.body.username });
    if (user) {
      res.status(409).send({ message: 'Username already exists' });
    }
    else {
      next();
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
  res.json({ 
    accessToken : generateAccessToken(req.user),
    user: req.user
  });
});

router.post('/signup', checkExistingUser, async (req, res) => {

  try {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    console.log(req.body)
    console.log('creating user');
    const user = await Users.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    const retUser = {
      name: user.name,
      username: user.username,
      email: user.email,
      _id: user._id,
    }
    res.json({ 
      accessToken : generateAccessToken({retUser}),
      user: retUser
    });
  }
  catch (error) {
    res.status(400).send({ message: error.message || 'Invalid User Data' });
  }
});


export { router };
