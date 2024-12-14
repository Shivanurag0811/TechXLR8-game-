const express = require('express');
const router = express.Router();
const Player = require('../models/player');

// Create a new player
router.post('/create', async (req, res) => {
    try {
        const { username, region } = req.body;
        const player = new Player({ username, region });
        await player.save();
        res.status(201).json({ message: 'Player created', player });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all players
router.get('/', async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a player
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedPlayer = await Player.findByIdAndUpdate(id, updates, { new: true });
        res.json(updatedPlayer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a player
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Player.findByIdAndDelete(id);
        res.json({ message: 'Player deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
