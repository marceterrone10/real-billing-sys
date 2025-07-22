import express from 'express';
import dotenv from 'dotenv';
import { connection } from './src/api/database/db.js';

const app = express();
dotenv.config();

connection();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
