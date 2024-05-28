import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import app from '../src/server.js';
import request from 'supertest';
import mongoose from 'mongoose';

let ACCESS_TOKEN = '';
let menu = [];
let customers = [];
let orders = [];
let server;

function randomString() {
  return Math.random().toString(36).substring(7);
}

function randomPrice() {
  return Math.floor(Math.random() * 1000);
}

const USER_TEST_OBJ = {
  email: 'test@email.com',
  password: 'password',
  username: 'testuser',
  name: 'testname',
}

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  
  await mongoose.connection.dropDatabase();
  console.log('Database dropped');
  server = app.listen(4000, () => {
    console.log('Server is running on port 4000');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('API', () => {
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
  });


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
      email: expect.any(String),
      username: body.username,
      name: expect.any(String),
      _id: expect.any(String),
    });
  });

  // create 10 menu items
  test('create 10 menu items', async () => {
    for (let i = 0; i < 10; i++) {
      const body = {
        title: 'menu item ' + i,
        price: randomPrice(),
      }
      const res = await request(app).post('/menu').set({ Authorization: `Bearer ${ACCESS_TOKEN}` }).send(body);
      menu.push(res.body);
      expect(res.status).toEqual(201);
    }
    console.log('menu', menu);
  });

  // create a customer
  test('create a customer', async () => {
    const body = {
      customerName: randomString(),
      phone: '(911) 922-1234',
    }

    const res = await request(app).post('/customers').set({ Authorization: `Bearer ${ACCESS_TOKEN}` }).send(body);
    if (res.status !== 201) {
      console.log(res.body);
    }
    customers.push(res.body);
    expect(res.status).toEqual(201);
    
  });

  // create an order
  test('create an order', async () => {
    const body = {
      customerId: customers[0]._id,
      cart: [
        {
          itemId: menu[0]._id,
          quantity: 2,
        },
        {
          itemId: menu[1]._id,
          quantity: 1,
        },
      ],
    }

    const res = await request(app).post('/orders').set({ Authorization: `Bearer ${ACCESS_TOKEN}` }).send(body);
    if (res.status === 500) {
      console.log(res.body);
    }
    orders.push(res.body);
    expect(res.status).toEqual(201);
  });

  // update an order
  test('update an order', async () => {
    const body = {
      status: true,
    }

    const res = await request(app).patch(`/orders/${orders[0]._id}`).set({ Authorization: `Bearer ${ACCESS_TOKEN}` }).send(body);
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual(true);
  });

  // complete an order
  test('complete an order', async () => {
    const res = await request(app).post(`/orders/${orders[orders.length-1]._id}/complete`).set({ Authorization: `Bearer ${ACCESS_TOKEN}` });
    console.log(res.body);
    expect(res.status).toEqual(200);
    orders.pop();
  });
});