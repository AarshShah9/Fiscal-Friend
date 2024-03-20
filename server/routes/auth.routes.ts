import express from 'express';

import { checkAuth } from '../middleware/checkAuth';
import {
  login,
  register,
  logout,
  me,
  updateMe,
} from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', checkAuth, logout);
router.post('/me', checkAuth, me);
router.post('/updateMe', checkAuth, updateMe);

export default router;
