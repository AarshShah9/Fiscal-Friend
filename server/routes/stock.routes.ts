import express from 'express';
import { getStockData } from '../controllers/stock.controller';
import { checkAuth } from '../middleware/checkAuth';

const router = express.Router();

router.post('/test', checkAuth, getStockData);

export default router;
