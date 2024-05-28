import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import app from '../src/server.js';
import request from 'supertest';
import { connect, disconnect } from '../__helper__/mongodb.memory.test.helper.js';

let ACCESS_TOKEN = '';
let menu = [];
let customers = [];
let orders = [];
let server;
beforeAll(async () => {
  await connect();
  server = app.listen(4000, () => {
    console.log('Server is running on port 4000');
  });
});

afterAll(async () => {
  await disconnect();
  server.close();
});

describe('Fail tests', () => {
  test('register', async () => {
    const body = {
      email: 'testemail.com',
      password: 'password',
      username: 'testuser',
      name: 'testname',
    }

    const res = await request(app).post('/users/signup').send(body);
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty('errors');
  });

  test('login', async () => {
    const body = {
      email: 'testemail.com',
      password: 'password',
    }

    const res = await request(app).post('/users/login').send(body);
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty('errors');
  });

  test('get all menu', async () => {
    const res = await request(app).get('/menu');
    expect(res.status).toEqual(401);
    expect(res.body).toHaveProperty('error' || 'errors');
  });

  test('get all customers', async () => {
    const res = await request(app).get('/customers');
    expect(res.status).toEqual(401);
    expect(res.body).toHaveProperty('error' || 'errors');
  });

  test('get all orders', async () => {
    const res = await request(app).get('/orders');
    expect(res.status).toEqual(401);
    expect(res.body).toHaveProperty('error' || 'errors');
  });

  test('get an order', async () => {
    const res = await request(app).get('/orders/1');
    expect(res.status).toEqual(401);
    expect(res.body).toHaveProperty('error' || 'errors');
  });

  test('delete an order', async () => {
    const res = await request(app).delete('/orders/1');
    expect(res.status).toEqual(401);
    expect(res.body).toHaveProperty('error' || 'errors');
  });
});