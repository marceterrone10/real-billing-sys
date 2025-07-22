import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
    const  {nombre, email, password, rol } = req.body; 

    try {
        const existingUser = await Usuario.findOne({ email });
        if (existingUser) {
            return res.status(400).json(
                { message: 'User already exists' }
            );
        };

        // First, hash the password
        const hash = await bcrypt.hash(password, 10);
        const newUser = new Usuario({
            nombre,
            email,
            password: hash,
            rol
        });

        await newUser.save();
        res.status(201).json({
            message: 'User registered successfully'
        });
        alert("User registered successfully");

    } catch (error) {
        console.log("Failed to register user:", error);
        res.status(500).json({ message: 'Error registering user' });
    }
};