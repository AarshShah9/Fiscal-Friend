import express from 'express';
import { checkAuth } from '../middleware/checkAuth';
import { createMortgage } from '../controllers/mortgage.controller';

const router = express.Router();

router.post('/create', checkAuth, createMortgage);

export default router;
