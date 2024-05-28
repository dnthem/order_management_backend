import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import { connect, disconnect, dropDatabase } from '../__helper__/mongodb.memory.test.helper.js';
import app from '../src/server.js';
import { Customers } from '../src/db/models/index.js';

let server;
let ACCESS_TOKEN;
let USER_ID;
let CUSTOMER_ID;
const USER_TEST_OBJ = {
  email: 'test@email.com',
  password: 'password',
  username: 'testuser',
  name: 'testname',
}

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

describe('CustomerController', () => {
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
    USER_ID = res.body.user._id;
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


  test('post_create_customer', async () => {
    const body = {
      customerName: 'John Doe',
      phone: '(733) 456-7890',
    };

    const res = await request(app).post('/customers').set({ Authorization: `Bearer ${ACCESS_TOKEN}` }).send(body);
    if (res.status !== 201) console.log(res.body);
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.customerName).toEqual(body.customerName);
    expect(res.body.phone).toEqual(body.phone);
    CUSTOMER_ID = res.body._id;
  });

  test('patch_update_customer', async () => {
    const updatedBody = {
      customerName: 'Jane Smith',
      phone: '(733) 456-7890',
    };

    const res = await request(app).patch(`/customers/${CUSTOMER_ID}`).set({ Authorization: `Bearer ${ACCESS_TOKEN}` }).send(updatedBody);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.customerName).toEqual(updatedBody.customerName);
    expect(res.body.phone).toEqual(updatedBody.phone);
  });

  test('delete_customer', async () => {

    const res = await request(app).delete(`/customers/${CUSTOMER_ID}`).set({ Authorization: `Bearer ${ACCESS_TOKEN}` });
    expect(res.status).toEqual(204);

    const deletedCustomer = await Customers.findById(CUSTOMER_ID);
    expect(deletedCustomer).toBeNull();
  });

  test('get_all_customers', async () => {
    const customer1 = new Customers({
      userID: USER_ID,
      customerName: 'John Doe',
      phone: '1234567890',
    });

    const customer2 = new Customers({
      userID: USER_ID,
      customerName: 'Jane Smith',
      phone: '1234567890',
    });

    await customer1.save();
    await customer2.save();

    const res = await request(app).get('/customers').set({ Authorization: `Bearer ${ACCESS_TOKEN}` });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveLength(2);

    const customerNames = res.body.map(customer => customer.customerName);
    expect(customerNames).toContain('John Doe');
    expect(customerNames).toContain('Jane Smith');
  });

  test('get_a_customer', async () => {
    const customer = new Customers({
      userID: USER_ID,
      customerName: 'John Doe',
      phone: '1234567890',
    });
    await customer.save();

    const res = await request(app).get(`/customers/${customer._id}`).set({ Authorization: `Bearer ${ACCESS_TOKEN}` });
    expect(res.status).toEqual(200);
    expect(res.body._id).toEqual(customer._id.toString());
    expect(res.body.customerName).toEqual(customer.customerName);
    expect(res.body.phone).toEqual(customer.phone);
  });
});