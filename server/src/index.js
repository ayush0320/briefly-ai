import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import newsRoutes from './routes/newsRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Connect to MongoDB
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Import and use auth routes
app.use('/api/auth', authRoutes);
// Import and use user routes
app.use('/api/user', userRoutes);
// Import and use news routes
app.use('/api/news', newsRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});