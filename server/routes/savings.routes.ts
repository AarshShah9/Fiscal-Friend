import express from 'express';
import { checkAuth } from '../middleware/checkAuth';
import {
  createSavings,
  getSavings,
  updateSavings,
} from '../controllers/savings.controller';

const router = express.Router();

router.post('/create', checkAuth, createSavings);
router.get('/get', checkAuth, getSavings);
router.put('/update', checkAuth, updateSavings);

export default router;
