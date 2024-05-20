import { Income } from  "../db/models/index.js";

const IncomeController = {
  // add a new income
  async addIncome(req, res) {
    try {
      const { amount, date } = req.body;
      const newIncome = new Income({ amount, date });
      await newIncome.save();
      res.status(201).send(newIncome);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  // update an income
  async updateIncome(req, res) {
    try {
      const { id } = req.params;
      await Income.findByIdAndUpdate
        (id
          , req.body
          , { new: true }
        );
      res.status(200).send({ message: "Updated" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  // delete an income
  async deleteIncome(req, res) {
    try {
      const { id } = req.params;
      await Income.findByIdAndDelete(id);
      res.status(200).send({ message: "Deleted" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  // get all incomes
  async getAllIncomes(req, res) {
    try {
      const incomes = await Income.find();
      res.status(200).send(incomes);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

}

export default IncomeController;