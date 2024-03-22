import express from 'express';

import { checkAuth } from '../middleware/checkAuth';
import {
  getRecentTransactions,
} from '../controllers/transaction.controller';

const router = express.Router();

router.post('/get', checkAuth, getRecentTransactions);


export default router;
