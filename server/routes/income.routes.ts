import express from "express";

import { checkAuth } from "../middleware/checkAuth";
import { createIncome, getIncomes, removeIncome } from "../controllers/income.controller";

const router = express.Router();

router.post("/create", checkAuth, createIncome);
router.post("/get", checkAuth, getIncomes);
router.post("/remove", checkAuth, removeIncome);

export default router;
