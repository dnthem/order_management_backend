import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../src/server.js';
import { connect, mongoose, disconnect, dropDatabase } from '../__helper__/mongodb.memory.test.helper.js';
import { Incomes } from '../src/db/models/index.js';

let server;

const USER_TEST_OBJ = {
  email: 'test@email.com',
  password: 'password',
  username: 'testuser',
  name: 'testname',
}


let ACCESS_TOKEN = '';
let menu = [];
let customers = [];
let orders = [];


beforeAll(async () => {
  await connect();
  console.log('Database connected');
  await dropDatabase();
  console.log('Database dropped');
  server = app.listen(4000, () => {
    console.log('Server is running on port 4000');
  });
});

afterAll(async () => {
  await disconnect();
  server.close();
});

describe('IncomeController', () => {
  test('register', async () => {
    const body = {
      email: USER_TEST_OBJ.email,
      password: USER_TEST_OBJ.password,
      username: USER_TEST_OBJ.username,
      name: USER_TEST_OBJ.name,
    }

    const res = await request(app).post('/users/signup').send(body);
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toEqual({
      email: body.email,
      username: body.username,
      name: body.name,
      _id: expect.any(String),
    });
  }),

  test('login', async () => {
    const body = {
      username: USER_TEST_OBJ.username,
      password: USER_TEST_OBJ.password,
    }

    const res = await request(app).post('/users/login').send(body);
    ACCESS_TOKEN = res.body.accessToken;
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toEqual({
      email: USER_TEST_OBJ.email,
      username: USER_TEST_OBJ.username,
      name: USER_TEST_OBJ.name,
      _id: expect.any(String),
    });
    USER_TEST_OBJ._id = res.body.user._id;
  });

  test('get_income - should return a single income', async () => {
    const income = new Incomes({
      userID: USER_TEST_OBJ._id,
      total: 1000,
      date: new Date(),
    });
    await income.save();

    const res = await request(app).get(`/incomes/${income._id}`).set('Authorization', `Bearer ${ACCESS_TOKEN}`);
    if (res.status === 500) console.log(res.body);
    expect(res.status).toEqual(200);
    expect(res.body.total).toEqual(income.total);

  });

  test('get_all_income - should return all incomes for a user', async () => {
    const incomes = [
      new Incomes({
        userID: USER_TEST_OBJ._id,
        total: 1000,
        date: new Date(2024,1,1).toISOString().split('T')[0],
      }),
      new Incomes({
        userID: USER_TEST_OBJ._id,
        total: 2000,
        date: new Date(2024,5,1).toISOString().split('T')[0],
      }),
    ];

    await Incomes.insertMany(incomes);

    const res = await request(app).get('/incomes').set('Authorization', `Bearer ${ACCESS_TOKEN}`);
    if (res.status === 500) console.log(res.body);
    expect(res.status).toEqual(200);
    // why 4? 1 from register, 1 from get_income, 2 from get_all_income
    expect(res.body.length).toEqual(4);
  });
});