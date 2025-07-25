import { Router } from 'express';
import { createBill, getBillById, getAllBills, updateBillStatus } from '../controllers/bill.controller.js';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware.js';
import { billSchema } from '../validators/bill.validator.js';
import { validateRequest } from '../middlewares/validateRequest.js';


const router = Router();

// Routes

router.post('/', authMiddleware, roleMiddleware, validateRequest(billSchema), createBill);
router.get('/:id', authMiddleware, roleMiddleware, getBillById);
router.get('/', authMiddleware, roleMiddleware, getAllBills);
router.patch('/:id', authMiddleware, roleMiddleware, updateBillStatus);


export default router;