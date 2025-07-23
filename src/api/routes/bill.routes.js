import { Router } from 'express';
import { createBill  } from '../controllers/bill.controller.js';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Routes

router.post('/', authMiddleware, roleMiddleware, createBill);

export default router;