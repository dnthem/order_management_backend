import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import { router as authRoutes } from './routes/auth.js';
import { router as indexRoutes } from './routes/index.js';
import * as db from './db/mongodb.js';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} else {
  console.log('Looks like we are in production mode!');
    // disable console.log
    console.log = function() {};
}


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // check if request from allowed origin
  if (req.headers.origin !== process.env.CORS_ORIGIN) {
    return res.status(403).send('Forbidden');
  }
  res.send('OK');
});

await db.connect();

app.use('/', authRoutes);
app.use('/', indexRoutes);

app.use("/*", (req, res) => {
  res.redirect(process.env.CORS_ORIGIN)
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});