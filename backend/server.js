import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import { router as authRoutes } from './routes/auth.js';
import { router as indexRoutes } from './routes/index.js';
import cors from 'cors';
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

const orginList = [
  'http://localhost:3000',
  'http://192.168.86.248:5173/',
];
app.use(cors({
  origin: orginList,
}));

await db.connect();


app.use('/', authRoutes);
app.use('/', indexRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});