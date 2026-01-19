import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Protected

router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        return res.status(200).json({ user });

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;