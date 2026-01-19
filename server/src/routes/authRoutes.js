import express, { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public

router.post('/register', async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // 1. Validate input
        if(!name || !email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }

        // 2. Check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        // 3. Hash password
        const hasedPassword = await bcrypt.hash(password, 10);

        // 4. Save user to database
        const newUser = await User.create({
            name,
            email,
            password: hasedPassword
        });

        return res.status(201).json({
            message: 'User registered successfully',
            user: {id: newUser._id, name: newUser.name, email: newUser.email}
        });
        
    } catch (error) {
        return res.status(500).json({message: 'Server error', error: error.message});
    }
});

// @route   POST /api/auth/login
// @desc    Login user and return JWT token
// @access  Public

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        // 1. Validate input
        if(!email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }

        // 2. Find user by email
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        // 3. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        // 4. Create and return JWT token
        const token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET);

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {id: user._id, name: user.name, email: user.email}
        });

    } catch (error) {
        return res.status(500).json({message: 'Server error', error: error.message});  
    }
});

export default router;