import { Customers, Menu, Incomes, Incomeuptodate, Orders } from "../db/models/index.js";
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
const OrderController = {
  // add a new order
  post_create_order: [

    body('cart').isArray().withMessage('Cart must be an array'),
    body('customerId').isMongoId().withMessage('Customer ID must be a valid Mongo ID'),

    asyncHandler(async (req, res) => {
      const newOrder = await new Orders({
        userID: req.user._id,
        cart: req.body.cart,
        customerId: req.body.customerId,
        promotion: req.body.promotion ?? 0,
        orderDate: new Date(),
        status: false,
      }).populate('cart.itemId');
      // update total price
      let total = 0;
      for (let i = 0; i < newOrder.cart.length; i++) {
        const item = newOrder.cart[i].itemId;
        total += item.price * newOrder.cart[i].quantity;
      }

      newOrder.total = total - (newOrder.promotion ?? 0);
      await newOrder.save();

      res.status(201).send(newOrder);
    })
  ],

  // update an order
  patch_update_order: [
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      const newUpdated = await Orders.findByIdAndUpdate
        (id
          , req.body
          , { new: true }
        ).populate('cart.itemId');
      // update total price
      let total = 0;
      for (let i = 0; i < newUpdated.cart.length; i++) {
        const item = newUpdated.cart[i].itemId;
        total += item.price * newUpdated.cart[i].quantity;
      }

      newUpdated.total = total - (newUpdated.promotion || 0);

      await newUpdated.save();

      res.status(200).send(newUpdated);
    })
  ],

  /**
   * complete an order
   * Route: POST: /api/orders/:id/complete
   */
  post_complete_order: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Orders.findById(id);
    order.status = true;
    await order.save();
    // update customer order count and total spent
    const customer = await Customers.findById(order.customerId);
    customer.orderCount += 1;
    customer.totalSpent += order.total;
    customer.lastPurchase = order.orderDate;
    await customer.save();

    // update menu order count
    for (let i = 0; i < order.cart.length; i++) {
      const menu = await Menu.findById(order.cart[i].itemId);
      menu.count += order.cart[i].quantity;
      await menu.save();
    }

    // update income
    const income = await Incomes.findOne();
    income.total += order.total;
    await income.save();

    // update income up to date
    const incomeUpToDate = await Incomeuptodate.findOne();
    incomeUpToDate.total += order.total;
    await incomeUpToDate.save();


    res.status(200).send({ message: "Completed" });
  }),
  // delete an order
  delete_order: asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Orders.findByIdAndDelete(id);
    res.status(200).send({ message: "Deleted" });
  }),

  // get all orders
  get_all_orders: asyncHandler(async (req, res) => {
    const userID = req.user._id;
    const orders = await Orders.find({ userID });
    res.status(200).send(orders);
  }),

  // get an order
  get_an_order: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Orders.findOne({ userID: req.user._id, _id: id });
    res.status(200).send(order);
  }),

}

export default OrderController;