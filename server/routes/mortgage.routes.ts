import express from 'express';
import { checkAuth } from '../middleware/checkAuth';
import {
  createMortgage,
  getMortgage,
  updateMortgage,
} from '../controllers/mortgage.controller';

const router = express.Router();

router.post('/create', checkAuth, createMortgage);
router.get('/get', checkAuth, getMortgage);
router.put('/update', checkAuth, updateMortgage);

export default router;
