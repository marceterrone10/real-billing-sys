import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized'
        });
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = decoded; // Attach the decoded user info to the request object
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};

export const roleMiddleware = (req, res, next) => {
    const { rol } = req.user;

    if (rol !== 'admin') {
        return res.status(403).json({
            error: 'Forbidden: You do not have permission to access this resource'
        });
    }
    next(); 
};

