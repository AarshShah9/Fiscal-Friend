import express from 'express';
import { checkAuth } from '../middleware/checkAuth';
import {
  createMortgage,
  getMortgage,
} from '../controllers/mortgage.controller';

const router = express.Router();

router.post('/create', checkAuth, createMortgage);
router.get('/get', checkAuth, getMortgage);

export default router;
