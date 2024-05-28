import { Incomes } from  "../db/models/index.js";
import asyncHandler from 'express-async-handler';

/**
 * Controller for managing income related operations.
 * @namespace IncomeController
 */
const IncomeController = {
  // get a single income
  get_income: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const income = await Incomes.findOne({ _id: id, userID: req.user._id });
      res.status(200).send(income);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }),

  // get all income
  get_all_income: asyncHandler(async (req, res) => {
    try {
      const incomes = await Incomes.find({ userID: req.user._id });
      res.status(200).send(incomes);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }),

}

export default IncomeController;