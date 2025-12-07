import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// @route   GET /api/player/profile
// @desc    Get player profile
// @access  Private
router.get('/profile', async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            player: req.user.getPublicProfile()
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   PUT /api/player/profile
// @desc    Update player profile
// @access  Private
router.put('/profile', async (req, res) => {
    try {
        const { displayName, avatar, preferences } = req.body;
        const user = await User.findById(req.user._id);

        if (displayName) user.playerData.displayName = displayName;
        if (avatar) user.playerData.avatar = avatar;
        if (preferences) {
            user.playerData.preferences = {
                ...user.playerData.preferences,
                ...preferences
            };
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            player: user.getPublicProfile()
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   PUT /api/player/stats
// @desc    Update player stats
// @access  Private
router.put('/stats', async (req, res) => {
    try {
        const { gamesPlayed, wins, losses, kills, deaths } = req.body;
        const user = await User.findById(req.user._id);

        if (gamesPlayed !== undefined) user.playerData.stats.gamesPlayed += gamesPlayed;
        if (wins !== undefined) user.playerData.stats.wins += wins;
        if (losses !== undefined) user.playerData.stats.losses += losses;
        if (kills !== undefined) user.playerData.stats.kills += kills;
        if (deaths !== undefined) user.playerData.stats.deaths += deaths;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Stats updated successfully',
            stats: user.playerData.stats
        });
    } catch (error) {
        console.error('Update stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   POST /api/player/achievement
// @desc    Add achievement
// @access  Private
router.post('/achievement', [
    body('name').notEmpty().withMessage('Achievement name is required'),
    body('description').notEmpty().withMessage('Achievement description is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { name, description } = req.body;
        const user = await User.findById(req.user._id);

        // Check if achievement already exists
        const exists = user.playerData.achievements.some(a => a.name === name);
        if (exists) {
            return res.status(400).json({
                success: false,
                message: 'Achievement already unlocked'
            });
        }

        user.playerData.achievements.push({
            name,
            description,
            unlockedAt: Date.now()
        });

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Achievement unlocked!',
            achievements: user.playerData.achievements
        });
    } catch (error) {
        console.error('Add achievement error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   POST /api/player/inventory
// @desc    Add item to inventory
// @access  Private
router.post('/inventory', [
    body('itemName').notEmpty().withMessage('Item name is required'),
    body('itemType').notEmpty().withMessage('Item type is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { itemName, itemType, quantity } = req.body;
        const user = await User.findById(req.user._id);

        // Check if item exists, update quantity
        const existingItem = user.playerData.inventory.find(
            item => item.itemName === itemName && item.itemType === itemType
        );

        if (existingItem) {
            existingItem.quantity += quantity || 1;
        } else {
            user.playerData.inventory.push({
                itemName,
                itemType,
                quantity: quantity || 1
            });
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Item added to inventory',
            inventory: user.playerData.inventory
        });
    } catch (error) {
        console.error('Add inventory error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   GET /api/player/leaderboard
// @desc    Get top players
// @access  Private
router.get('/leaderboard', async (req, res) => {
    try {
        const topPlayers = await User.find({ isActive: true })
            .sort({ 'playerData.stats.wins': -1 })
            .limit(100)
            .select('username playerData.displayName playerData.rank playerData.stats playerData.level');

        res.status(200).json({
            success: true,
            leaderboard: topPlayers
        });
    } catch (error) {
        console.error('Get leaderboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

export default router;
