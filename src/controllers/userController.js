import { Users, Income, Incomeuptodate } from "../db/models/index.js";

const UserController = {
  // create a new user
  // should use session to create a new user AKA: transaction in mongodb
  async createUser(req, res) {
    try {
      const newUser = new Users(req.body);
      await newUser.save();
      // create new incomes document
      const newIncome = new Income({ userID: newUser._id });
      await newIncome.save();
      // create new incomesuptodate document
      const newIncomeuptodate = new Incomeuptodate({ userID: newUser._id });
      await newIncomeuptodate.save();

      res.status(201).send(newUser);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  // update a user
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      await Users.findByIdAndUpdate
        (id
          , req.body
          , { new: true }
        );

      res.status(200).send({ message: "Updated" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  // delete a user
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await Users.findByIdAndDelete(id);

      // delete incomes document
      await Incomes.deleteOne({ userID: id });
      // delete incomesuptodate document
      await Incomesuptodate.deleteOne({ userID: id });
      // delete all orders
      await Orders.deleteMany({ userID: id });
      // delete all customers
      await Customers.deleteMany({ userID: id });
      // delete all menus
      await Menu.deleteMany({ userID: id });

      res.status(200).send({ message: "Deleted" });
      
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },
}

export default UserController;