import IncomeController from "../controllers/incomeController.js";
import express from "express";

const router = express.Router();

router.get("/", IncomeController.get_all_income);
router.get("/:id", IncomeController.get_income);

export { router };