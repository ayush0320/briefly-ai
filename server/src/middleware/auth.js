import jwt from 'jsonwebtoken';

// Middleware to authenticate JWT token
// Checks for the token in the Authorization header

export default function auth(req, res, next) {
    try {
        // Expected format: "Bearer <token>"
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided, authorization denied' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info to request object
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token', error: error.message });
    }
}