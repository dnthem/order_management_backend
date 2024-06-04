import { Incomes, Incomeuptodate } from "../db/models/index.js";
import asyncHandler from 'express-async-handler';

/**
 * Controller for managing income related operations.
 * @namespace IncomeController
 */
const IncomeController = {
  
  /**
   * Create a income
   * Route: POST /incomes
   * @param {string} incomeName - income name
   * @param {number} amount - income amount
   * @returns {object} - new income
   */
  get_income: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const income = await Incomes.findOne({ _id: id, userID: req.user._id });
    res.status(200).send(income);
  }),

  /**
   * Get all incomes
   * Route: GET /incomes
   * @param {number} limit - limit the number of incomes returned
   * @returns {object} - list of incomes
   */
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

  /**
   * Get income uptodate
   * Route: GET /incomes/up-to-date
   * @returns {object} - income uptodate
   */
  get_income_uptodate: asyncHandler(async (req, res) => {
    const income = await Incomeuptodate.findOne({ userID: req.user._id });
    res.status(200).send(income);
  }),

}

export default IncomeController;