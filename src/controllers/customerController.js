import { Customers } from  "../db/models/index.js";

const CustomerController = {
  // add a new customer
  async addCustomer(req, res) {
    try {
      const newCustomer = new Customers(req.body);
      await newCustomer.save();
      res.status(201).send(newCustomer);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  // update a customer
  async updateCustomer(req, res) {
    try {
      const { id } = req.params;
      await Customers.findByIdAndUpdate
        (id
          , req.body
          , { new: true }
        );
      res.status(200).send({ message: "Updated" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  // delete a customer
  async deleteCustomer(req, res) {
    try {
      const { id } = req.params;
      await Customers.findByIdAndDelete(id);
      res.status(200).send({ message: "Deleted" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  // get all customers
  async getAllCustomers(req, res) {
    try {
      const customers = await Customers.find();
      res.status(200).send(customers);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  // get a customer
  async getCustomer(req, res) {
    try {
      const { id } = req.params;
      const customer = await Customers.findById(id);
      res.status(200).send(customer);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

}

export default CustomerController;