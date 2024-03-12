import express from 'express';
import { getStockData } from '../controllers/stock.controller';

const router = express.Router();

router.get('/test', getStockData);

export default router;
