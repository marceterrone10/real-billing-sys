import { Router } from 'express';
import { createBill, getBillById } from '../controllers/bill.controller.js';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Routes

router.post('/', authMiddleware, roleMiddleware, createBill);
router.get('/:id', authMiddleware, roleMiddleware, getBillById);

export default router;