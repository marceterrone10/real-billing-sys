import { Router } from 'express';
import { createProduct, getProducts, getProductById } from '../controllers/product.controller.js';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Routes

router.post('/', authMiddleware, roleMiddleware, createProduct);
router.get('/', authMiddleware, roleMiddleware, getProducts);
router.get('/:id', authMiddleware, roleMiddleware, getProductById);

export default router;
