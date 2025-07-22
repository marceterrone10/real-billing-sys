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

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Usuario.find({ email });

        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            });
        };

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        };

        // Now, generate a JWT token
        const token = jwt.sign(
            {   id: user._id,
                email: user.email,
                rol: user.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token will expire in 1 hour
        );
        res.status(200).json({
            message: 'Login successful',
            token
        });
        console.log("User logged in successfully");

    } catch (error) {
        console.log("Failed to login user:", error);
        res.status(500).json({ message: 'Error logging in user' });
    }
};