import express from 'express';
import { checkAuth } from '../middleware/checkAuth';
import { createSavings, getSavings } from '../controllers/savings.controller';

const router = express.Router();

router.post('/create', checkAuth, createSavings);
router.get('/get', checkAuth, getSavings);

export default router;
