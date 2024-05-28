import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../src/server.js';
import mongoose from 'mongoose';
import { Menu } from '../src/db/models/index.js';

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

describe('MenuController', () => {
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

  test('post_create_menuItem - should create a new menu item', async () => {
    const menuItem = {
      title: 'Sample Menu Item',
      price: 9.99,
    };

    const res = await request(app)
      .post('/menu')
      .send(menuItem)
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`);

    expect(res.status).toEqual(201);
    expect(res.body.title).toEqual(menuItem.title);
    expect(res.body.price).toEqual(menuItem.price);
  });

  test('path_update_menuItem - should update a menu item', async () => {
    const menuItem = new Menu({
      userID: USER_ID,
      title: 'Sample Menu Item',
      price: 9.99,
    });
    await menuItem.save();

    const updatedMenuItem = {
      title: 'Updated Menu Item',
      price: 12.99,
    };

    const res = await request(app)
      .patch(`/menu/${menuItem._id}`)
      .send(updatedMenuItem)
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`);

    if (res.status !== 200) console.log(res.body);
    expect(res.status).toEqual(200);
    expect(res.body.title).toEqual(updatedMenuItem.title);
    expect(res.body.price).toEqual(updatedMenuItem.price);
  });

  test('delete_menuItem - should delete a menu item', async () => {
    const menuItem = new Menu({
      userID: USER_ID,
      title: 'Sample Menu Item',
      price: 9.99,
    });
    await menuItem.save();

    const res = await request(app)
      .delete(`/menu/${menuItem._id}`)
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`);
      if (res.status !== 204) console.log(res.body);
    expect(res.status).toEqual(204);
  });

  test('get_all_menuItems - should return all menu items for a user', async () => {

    const menuItems = [
      new Menu({
        userID: USER_ID,
        title: 'Menu Item 1',
        price: 9.99,
      }),
      new Menu({
        userID: USER_ID,
        title: 'Menu Item 2',
        price: 12.99,
      }),
    ];

    await Menu.insertMany(menuItems);

    const res = await request(app)
      .get('/menu')
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`);

    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual(4);
  });

  test('get_a_menuItem - should return a single menu item', async () => {
    const menuItem = new Menu({
      userID: USER_ID,
      title: 'Sample Menu Item',
      price: 9.99,
    });
    await menuItem.save();

    const res = await request(app)
      .get(`/menu/${menuItem._id}`)
      .set('Authorization', `Bearer ${ACCESS_TOKEN}`);

    if (res.status !== 200) console.log(res.body);  
    expect(res.status).toEqual(200);
    expect(res.body.title).toEqual(menuItem.title);
    expect(res.body.price).toEqual(menuItem.price);
  });
});