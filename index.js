import express from 'express';
import dotenv from 'dotenv';
import { connection } from './src/api/database/db.js';
import authRoutes from './src/api/routes/auth.routes.js';
import productRoutes from './src/api/routes/product.routes.js';

// Initialize the Express app
const app = express();
dotenv.config();

// Start the database connection
connection();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes for register/login
app.use('/api/auth', authRoutes);

// Routes for products (get, create, update, delete) only for admin users
app.use('/api/products', productRoutes);


const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
