import { Router } from 'express';
import { createProduct } from '../controllers/product.controller.js';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Routes

router.post('/', authMiddleware, roleMiddleware, createProduct);

export default router;
