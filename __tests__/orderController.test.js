import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../src/server.js';
import mongoose from 'mongoose';
import { Orders, Customers, Menu, Incomes, Incomeuptodate } from '../src/db/models/index.js';

let server;
let ACCESS_TOKEN;
let USER_ID;
let CUSTOMER_ID;
let MENU = [];
let ORDERS = [];
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

describe('OrderController', () => {
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
    USER_ID = res.body.user._id;
    ACCESS_TOKEN = res.body.accessToken;
  });

  test('post_create_order - should create a new order', async () => {
    const user = {
      _id: USER_ID,
    };

    const menuItems = [
      new Menu({
        userID: USER_ID,
        title: 'Menu Item 1',
        price: 10,
      }),
      new Menu({
        userID: USER_ID,
        title: 'Menu Item 2',
        price: 12,
      }),
    ];

    await Menu.insertMany(menuItems);

    MENU = menuItems;

    const customer = new Customers({
      userID: user._id,
      customerName: 'testuser',
      phone: '(913) 123-4567',
    });

    await customer.save();
    CUSTOMER_ID = customer._id;

    const cart = [
      {
        itemId: menuItems[0]._id,
        quantity: 2,
      },
      {
        itemId: menuItems[1]._id,
        quantity: 1,
      },
    ];

    const newOrder = {
      userID: user._id,
      customerId: customer._id,
      cart,
    };

    const total = 32;

    const res = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
      .send(newOrder);

    console.log('order', res.body);
    expect(res.status).toEqual(201);
    expect(res.body.userID).toEqual(user._id);
    expect(res.body.total).toEqual(total);

    ORDERS.push(res.body);
  });

  test('patch_update_order - should update an order', async () => {
    const order = ORDERS[0];
    const updatedOrder = {
      promotion: 5,
    };

    const oldTotal = order.total;

    const res = await request(app)
      .patch(`/orders/${order._id}`)
      .send(updatedOrder).set('Authorization', `Bearer ${ACCESS_TOKEN}`);

    if(res.status !== 200) console.log(res.body);
    expect(res.status).toEqual(200);
    expect(res.body.total).toEqual(oldTotal - 5);
    expect(res.body.promotion).toEqual(5);
    ORDERS[0] = res.body;
  });

  test('post_complete_order - should complete an order', async () => {
    const order = ORDERS[0]; 
    const res = await request(app).post(`/orders/${order._id}/complete`).set('Authorization', `Bearer ${ACCESS_TOKEN}`);

    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual('Completed');

    const customer = await Customers.findById(CUSTOMER_ID);
    expect(customer.orderCount).toEqual(1);
    expect(customer.totalSpent).toEqual(order.total);

    const income = await Incomes.findOne({userID: USER_ID});
    expect(income.total).toEqual(order.total);

    const menu = await Menu.findById(order.cart[0].itemId);
    expect(menu.count).toEqual(order.cart[0].quantity);

    const incomeUpToDate = await Incomeuptodate.findOne({userID: USER_ID});
    expect(incomeUpToDate.total).toEqual(order.total);
  });

  test('delete_order - should delete an order', async () => {
    const order = ORDERS[0];

    const res = await request(app).delete(`/orders/${order._id}`).set('Authorization', `Bearer ${ACCESS_TOKEN}`);

    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual('Deleted');
  });

  test('get_all_orders - should return all orders for a user', async () => {
    const orders = [
      {
        customerId: CUSTOMER_ID,
        cart: [
          {
            itemId: MENU[0]._id,
            quantity: 2,
          },
          {
            itemId: MENU[1]._id,
            quantity: 1,
          },
        ],
      },
      {
        customerId: CUSTOMER_ID,
        cart: [
          {
            itemId: MENU[0]._id,
            quantity: 1,
          },
          {
            itemId: MENU[1]._id,
            quantity: 3,
          },
        ],
      },
    ];

    orders.forEach(async (order, index) => {
      const res = await request(app).post('/orders').set('Authorization', `Bearer ${ACCESS_TOKEN}`).send(order);

      if(res.status !== 201) console.log(res.body);
      expect(res.status).toEqual(201);
      orders[index] = res.body;
    });

    const res = await request(app)
      .get('/orders')
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`);

    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual(2);

    ORDERS = orders;
  });

  test('get_an_order - should return a single order for a user', async () => {


    const res = await request(app)
      .get(`/orders/${ORDERS[0]._id}`)
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`);

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('paymentType');
    expect(res.body.cart.length).toEqual(2);
    expect(res.body.total).toEqual(32);
  });
});