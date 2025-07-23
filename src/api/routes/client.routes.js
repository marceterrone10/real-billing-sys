import { Router } from 'express';
import { createClient } from '../controllers/client.controller.js';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware.js';


const router = Router();

router.post('/', authMiddleware, roleMiddleware, createClient);

export default router;
