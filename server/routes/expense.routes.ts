import express from "express";

import { checkAuth } from "../middleware/checkAuth";
import { createExpense, getExpenses, removeExpense } from "../controllers/expense.controller";

const router = express.Router();

router.post("/create", checkAuth, createExpense);
router.post("/get", checkAuth, getExpenses);
router.post("/remove", checkAuth, removeExpense);

export default router;
