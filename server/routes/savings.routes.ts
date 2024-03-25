import express from 'express';
import { checkAuth } from '../middleware/checkAuth';
import {
  createSavings,
  getAllSavings,
  getSavings,
  updateSavings,
} from '../controllers/savings.controller';

const router = express.Router();

router.post('/create', checkAuth, createSavings);
router.get('/get', checkAuth, getSavings);
router.put('/update', checkAuth, updateSavings);
router.get('/mainPageData', checkAuth, getAllSavings);

export default router;
