import { Router } from 'express';
import { createClient, getClients, getClientById, updateClient } from '../controllers/client.controller.js';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { clientSchema } from '../validators/client.validator.js';

const router = Router();

router.post('/', authMiddleware, roleMiddleware, validateRequest(clientSchema), createClient);
router.get('/', authMiddleware, roleMiddleware, getClients);
router.get('/:id', authMiddleware, roleMiddleware, getClientById);
router.put('/:id', authMiddleware, roleMiddleware, updateClient);

export default router;
