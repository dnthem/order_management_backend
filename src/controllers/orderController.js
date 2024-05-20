import { Customers, Menu, Income, Incomeuptodate, Orders } from "../db/models/index.js";
const OrderController = {
  // add a new order
  async addOrder(req, res) {
    try {
      const newOrder = new Orders(req.body);
      await newOrder.save();

      // update total price
      let total = 0;
      for (let i = 0; i < newOrder.cart.length; i++) {
        const menu = await Menu.findById(newOrder.cart[i].item);
        total += menu.Price * newOrder.cart[i].quantity;
      }
      newOrder.total = total - newOrder.promotion;
      newOrder.save();

      res.status(201).send(newOrder);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  // update an order
  async updateOrder(req, res) {
    try {
      const { id } = req.params;
      await Orders.findByIdAndUpdate
        (id
          , req.body
          , { new: true }
        );

      res.status(200).send({ message: "Updated" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  // complete an order
  async completeOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await Orders.findById(id);
      order.status = true;
      order.save();
      // update customer order count and total spent
      const customer = await Customers.findById(order.customer);
      customer.orderCount += 1;
      customer.totalSpent += order.total;
      customer.lastPurchase = order.orderDate;
      customer.save();

      // update menu order count
      for (let i = 0; i < order.cart.length; i++) {
        const menu = await Menu.findById(order.cart[i].item);
        menu.orderCount += order.cart[i].quantity;
        menu.save();
      }

      // update income
      const income = await Income.findOne();
      income.totalIncome += order.total;
      income.save();

      // update income up to date
      const incomeUpToDate = await Incomeuptodate.findOne();
      incomeUpToDate.totalIncome += order.total;
      incomeUpToDate.save();

      res.status(200).send({ message: "Completed" });
    }
    catch (error) {
      res.status(500).send({ error: error.message });
    }
  },
  // delete an order
  async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      await Orders.findByIdAndDelete(id);
      res.status(200).send({ message: "Deleted" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  // get all orders
  async getAllOrders(req, res) {
    try {
      const orders = await Orders.find();
      res.status(200).send(orders);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  // get an order
  async getOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await Orders.findById(id);
      res.status(200).send(order);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

}

export default OrderController;