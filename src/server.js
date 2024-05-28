import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { router as menuRoutes } from './routes/menuRoute.js';
import { router as orderRoutes } from './routes/orderRoute.js';
import { router as customerRoutes } from './routes/customerRoute.js';
import { router as userRoutes } from './routes/userRoute.js';
import { router as incomeRoutes } from './routes/incomeRoute.js';
import { authenticateToken } from './utils/jwt.js';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

dotenv.config();
if (process.env.NODE_ENV === 'test') {
  console.log = function () { }; // disable console.log
}

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} else {
  console.log('Looks like we are in production mode!');
  // disable console.log
  console.log = function () { };
}

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), 'public')));

if (process.env.NODE_ENV !== 'production') {
  app.use(logger('dev'));
}

app.use(function (req, res, next) {
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


app.post('/', (req, res) => {
  const { a, b } = req.body;
  res.status(200).json(a + b);
});

app.use('/users', userRoutes);
app.use(authenticateToken);
app.use('/menu', menuRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);
app.use('/incomes', incomeRoutes)

app.use("/*", (req, res) => {
  res.redirect(process.env.CORS_ORIGIN)
});

app.use((err, req, res, next) => {
  // handle error
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});


export default app;