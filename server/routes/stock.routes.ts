import express from 'express';
import {
  getSavedStocks,
  getStockData,
  removeStock,
  saveSymbol,
} from '../controllers/stock.controller';
import { checkAuth } from '../middleware/checkAuth';

const router = express.Router();

router.post('/search', checkAuth, getStockData);
router.post('/save', checkAuth, saveSymbol);
router.post('/get', checkAuth, getSavedStocks);
router.post('/remove', checkAuth, removeStock);

export default router;
