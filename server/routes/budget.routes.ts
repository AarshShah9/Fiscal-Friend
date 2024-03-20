import express from "express";

import { checkAuth } from "../middleware/checkAuth";
import { getBudget } from "../controllers/budget.controller";

const router = express.Router();

router.post("/budget", checkAuth, getBudget);

export default router;
