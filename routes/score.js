const express = require('express');
const router = express.Router();
const Score = require('../models/score');

// Add a new score
router.post('/add', async (req, res) => {
    try {
        const { playerId, gameId, score } = req.body;
        const newScore = new Score({ playerId, gameId, score });
        await newScore.save();
        res.status(201).json({ message: 'Score added', score: newScore });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get scores by player
router.get('/player/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const scores = await Score.find({ playerId: id }).populate('gameId', 'name');
        res.json(scores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get global leaderboard
router.get('/leaderboard/global', async (req, res) => {
    try {
        const topScores = await Score.find()
            .populate('playerId', 'username')
            .populate('gameId', 'name')
            .sort({ score: -1 })
            .limit(10);
        res.json(topScores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get regional leaderboard
router.get('/leaderboard/regional/:region', async (req, res) => {
    try {
        const { region } = req.params;
        const topScores = await Score.find()
            .populate({
                path: 'playerId',
                match: { region },
                select: 'username',
            })
            .populate('gameId', 'name')
            .sort({ score: -1 })
            .limit(10);
        res.json(topScores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
