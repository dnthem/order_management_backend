import { Income } from  "../db/models/index.js";
import asyncHandler from 'express-async-handler';

const IncomeController = {
  // get a single income
  get_income: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const income = await Income.findById({id});
      res.status(200).send(income);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }),

  // get all income
  get_all_income: asyncHandler(async (req, res) => {
    try {
      const incomes = await Income.find({ userID: req.user._id });
      res.status(200).send(incomes);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }),

}

export default IncomeController;