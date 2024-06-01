import { Users, Incomes, Incomeuptodate, Orders, Customers, Menu } from '../db/models/index.js';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { authenticateToken, generateAccessToken } from '../utils/jwt.js';
const SALT_ROUNDS = 10; // bcrypt salt rounds

const findUserWithSameUsername = async (username) => {
  const existingUser = await Users.findOne({ username });
  if (existingUser) {
    throw new Error('Username already exists');
  }
}

const findUserWithSameEmail = async (email) => {
  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    throw new Error('Email already exists');
  }
}

/**
 * Controller for handling user-related operations.
 *
 * @namespace UserController
 */
const UserController = {

  /**
   * Preflight request - used to check if the user is authenticated
   * Route: GET /users/preflight
   * @returns {object} - status 200 if authenticated
   */
  get_preflight: [
    authenticateToken,
    asyncHandler(async (req, res) => {
      res.status(200);
    })
  ],

  /**
   * Login a user
   * Route: POST /users/login
   * @param {string} username - username
   * @param {string} password - password
   * @returns {object} - user object
  */
  post_login: [
    body('username').isLength({ min: 5 }).trim().escape().withMessage('Username must be at least 5 characters'),
    body('password').isLength({ min: 5 }).trim().escape().withMessage('Password must be at least 5 characters'),
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await Users.findOne({ username: req.body.username });
      if (!user) {
        return res.status(401).send({ error: 'Username or Password is incorrect' });
      }

      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return res.status(401).send({ error: 'Username or Password is incorrect' });
      }

      res.status(200).json({
        accessToken: generateAccessToken({
          _id: user._id,
          username: user.username,
          email: user.email,
          name: user.name,
        }),
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          name: user.name,
        }
      });
    })
  ],


  // create a new user AKA: signup
  // should use session to create a new user AKA: transaction in mongodb
  /**
   * create a user
   * Route: POST /users/signup
   * @param {string} username - username
   * @param {string} password - password
   * @param {string} email - email
   * @param {string} name - name
   * @returns {object} - user object
   */
  post_create_user: [
    body('username').custom(findUserWithSameUsername).isLength({ min: 5 }).trim().escape().withMessage('Username must be at least 5 characters'),
    body('password').isLength({ min: 5 }).trim().escape().withMessage('Password must be at least 5 characters'),
    body('email').isEmail().trim().isEmail().normalizeEmail().escape().custom(findUserWithSameEmail).withMessage('Email already exists'),
    body('name').isLength({ min: 5 }).trim().escape().withMessage('Name must be at least 5 characters'),
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const hashPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
      const newUser = new Users({
        username: req.body.username,
        password: hashPassword,
        email: req.body.email,
        name: req.body.name,
      });
      await newUser.save();

      // create other documents
      await new Incomeuptodate({ userID: newUser._id }).save();

      // Q: what is the advantage of using JWT here?
      // A: JWT is used to authenticate the user and provide access to the application
      console.log('newUser', newUser);

      res.status(201).json({
        accessToken: generateAccessToken({
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          name: newUser.name,
        }),
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          name: newUser.name,
        }
      });
    })
  ],

  /**
   * Update a user
   * Route: PATCH /users/:id
   * @param {string} name - user name
   * @returns {object} - updated user
   */
  patch_update_user: [
    body('name').isLength({ min: 5 }).trim().escape().withMessage('Name must be at least 5 characters'),
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const updatedUser = await Users.findByIdAndUpdate
        (id
          , { name: req.body.name }
          , { new: true }
        );
      res.status(200).json(updatedUser);
    })
  ],

  /**
   * Delete a user
   * Route: DELETE /users/:id
   * @param {string} id - user ID
   * @returns {} - status 204
   */
  delete_user: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = Users.findOne({ _id: id });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    await Users.findByIdAndDelete(id);

    // delete incomes document
    await Incomes.deleteMany({ userID: id });
    // delete incomesuptodate document
    await Incomeuptodate.deleteMany({ userID: id });
    // delete all orders
    await Orders.deleteMany({ userID: id });
    // delete all customers
    await Customers.deleteMany({ userID: id });
    // delete all menus
    await Menu.deleteMany({ userID: id });

    res.status(200).send({ message: "Deleted" });
  }),
}

export default UserController;