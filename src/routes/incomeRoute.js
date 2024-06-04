import IncomeController from "../controllers/incomeController.js";
import express from "express";

const router = express.Router();

router.get("/up-to-date", IncomeController.get_income_uptodate);
router.get("/", IncomeController.get_all_income);
router.get("/:id", IncomeController.get_income);

export { router };