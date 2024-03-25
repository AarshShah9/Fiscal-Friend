import express from 'express';
import {
  getSavedBySymbol,
  getSavedStocks,
  getStockData,
  removeStock,
  requestUserFavorites,
  saveBoughtStock,
  saveSymbol,
} from '../controllers/stock.controller';
import { checkAuth } from '../middleware/checkAuth';

const router = express.Router();

router.post('/search', checkAuth, getStockData);
router.post('/save', checkAuth, saveSymbol);
router.post('/saveBought', checkAuth, saveBoughtStock);
router.post('/get', checkAuth, getSavedStocks);
router.post('/getSymbol', checkAuth, getSavedBySymbol);
router.post('/remove', checkAuth, removeStock);
router.post('/searchFavourites', checkAuth, requestUserFavorites);

export default router;
