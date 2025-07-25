import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { userSchema, userLoginSchema } from '../validators/user.validator.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = Router();

// Routes
router.post('/register', validateRequest(userSchema), register);
router.post('/login', validateRequest(userLoginSchema), login);

export default router;