import express from 'express';
import dotenv from 'dotenv';
import { connection } from './src/api/database/db.js';
import authRoutes from './src/api/routes/auth.routes.js';
import productRoutes from './src/api/routes/product.routes.js';
import billRoutes from './src/api/routes/bill.routes.js';
import clientRoutes from './src/api/routes/client.routes.js';
import { loggerMiddleware } from './src/api/middlewares/logger.middleware.js';
import { errorHandler } from './src/api/middlewares/errorHandler.js';
import testRoutes from './src/api/routes/testError.routes.js';

// Initialize the Express app
const app = express();
dotenv.config();

// Start the database connection
connection();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for logging requests
app.use(loggerMiddleware);

// Routes for register/login
app.use('/api/auth', authRoutes);

// Routes for products (get, create, update, delete) only for admin users
app.use('/api/products', productRoutes);

// Routes for bills
app.use('/api/bills', billRoutes);

// Route for clients
app.use('/api/clients', clientRoutes);

// Test route to trigger an error
app.use('/api', testRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3300;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
