import { Customers } from "../db/models/index.js";
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
const CustomerController = {
  // add a new customer
  post_create_customer: [
    body('customerName').isLength({ min: 1 }).trim().escape().withMessage('Name must be at least 1 characters'),
    body('phone').isMobilePhone().withMessage('Phone number must be valid'),
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { customerName, phone } = req.body;
      const newCustomer = new Customers({
        userID: req.user._id,
        customerName,
        phone,
      });
      await newCustomer.save();
      res.status(201).send(newCustomer);
    })
  ],

  // update a customer
  patch_update_customer: [
    body('customerName').isLength({ min: 1 }).trim().escape().withMessage('Name must be at least 1 characters'),
    body('phone').isMobilePhone('en-US').withMessage('Phone number must be valid'),
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { id } = req.params;
      const updatedCustomer = await Customers.findByIdAndUpdate
        (id
          , req.body
          , { new: true }
        );
      res.status(200).json(updatedCustomer);
    })
  ],

  // delete a customer
  delete_customer: asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    await Customers.findByIdAndDelete(id);
    res.status(204).send();
  }),

  // get all customers
  get_all_customers: asyncHandler(async (req, res) => {
    const customers = await Customers.find({ userID: req.user._id });
    res.status(200).send(customers);
  }),

  // get a customer
  get_a_customer: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const customer = await Customers.findById(id);
    res.status(200).send(customer);
  }),

}

export default CustomerController;