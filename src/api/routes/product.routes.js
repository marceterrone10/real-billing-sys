import { Router } from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Routes

router.post('/', authMiddleware, roleMiddleware, createProduct);
router.get('/', authMiddleware, roleMiddleware, getProducts);
router.get('/:id', authMiddleware, roleMiddleware, getProductById);
router.put('/:id', authMiddleware, roleMiddleware, updateProduct);
router.delete('/:id', authMiddleware, roleMiddleware, deleteProduct);

export default router;
