import { Incomes, Incomeuptodate } from "../db/models/index.js";
import asyncHandler from 'express-async-handler';

/**
 * Controller for managing income related operations.
 * @namespace IncomeController
 */
const IncomeController = {
  // get a single income
  get_income: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const income = await Incomes.findOne({ _id: id, userID: req.user._id });
    res.status(200).send(income);
  }),

  // get all income
  get_all_income: asyncHandler(async (req, res) => {
    const { limit } = req.query;

    let incomes;

    if (limit) {
      incomes = await Incomes.find({ userID: req.user._id }).limit(parseInt(limit));
    } else {
      incomes = await Incomes.find({ userID: req.user._id });
    }

    res.status(200).send(incomes);
  }),

  get_income_uptodate: asyncHandler(async (req, res) => {
    const income = await Incomeuptodate.findOne({ userID: req.user._id });
    res.status(200).send(income);
  }),

}

export default IncomeController;