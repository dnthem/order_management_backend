import { Customers, Menu, Incomes, Incomeuptodate, Orders } from "../db/models/index.js";
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
const OrderController = {
  // add a new order
  post_create_order: [

    body('cart').isArray().withMessage('Cart must be an array'),
    body('customerId').isMongoId().withMessage('Customer ID must be a valid Mongo ID'),

    asyncHandler(async (req, res) => {
      const newOrder = new Orders({
        userID: req.user._id,
        cart: req.body.cart,
        customerId: req.body.customerId,
        promotion: req.body.promotion ?? 0,
        orderDate: new Date().toISOString().split('T')[0],
        deliverDate: req.body.deliverDate,
        status: false,
      });
    
      await newOrder.save();
    
      // Populate the order with item details
      const populatedOrder = await Orders.findById(newOrder._id)
        .populate('cart.itemId')
        .populate('customerId');
    
      // Calculate the total price
      let total = 0;
      for (let i = 0; i < populatedOrder.cart.length; i++) {
        const item = populatedOrder.cart[i].itemId;
        total += item.price * populatedOrder.cart[i].quantity;
      }
    
      // Update the total price with promotion
      populatedOrder.total = total - (populatedOrder.promotion ?? 0);
      await populatedOrder.save();
    
      res.status(201).send(populatedOrder);
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
        ).populate('cart.itemId').populate('customerId');
      // update total price
      let total = 0;
      for (let i = 0; i < newUpdated.cart.length; i++) {
        const item = newUpdated.cart[i].itemId;
        total += item.price * newUpdated.cart[i].quantity;
      }

      newUpdated.total = total - (newUpdated.promotion || 0);

      (await newUpdated.save()).populate;

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
    incomeUpToDate.updatedDate = new Date().toISOString().split('T')[0];
    await incomeUpToDate.save();


    res.status(200).send({ message: "Completed" });
  }),
  // delete an order
  delete_order: asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Orders.findByIdAndDelete(id);
    res.status(200).send({ message: "Deleted" });
  }),

  /**
   * get all orders
   * Route: GET: /api/orders
   * Query: status, nopopulate, orderDate
   * @query status: boolean - true is completed, false is not completed
   * @query nopopulate: boolean - true is not populate, false is populate
   * @query orderDate: string (YYYY-MM-DD)
   * 
   * Example: /api/orders?status=true&nopopulate=true&orderDate=2021-09-01
   * @returns {Array} orders
   */
  get_all_orders: asyncHandler(async (req, res) => {
    let orders;
    const query = {
      userID: req.user._id,
    }
    // query includes status, nopopulate, and date in format YYYY-MM-DD
    const { status, nopopulate, orderDate } = req.query;

    if (status) {
      query.status = status === 'true';
    }
    if (orderDate) {
      query.orderDate = orderDate;
    }
    

    if (!nopopulate) {
      orders = await Orders.find(query).populate('cart.itemId').populate('customerId');
    } else {
      orders = await Orders.find(query);
    }
   
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