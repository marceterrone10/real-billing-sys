import express from 'express';
import { ApiError } from '../utils/apiError.js';

const router = express.Router();

router.get('/test-error', (req, res, next) => {
  try {
    throw new ApiError(403, 'This is a test error');
  } catch (error) {
    next(error);
  }
});

export default router;
