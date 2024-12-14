const express = require('express');
const router = express.Router();
const Game = require('../models/game');

// Add a new game
router.post('/create', async (req, res) => {
    try {
        const { name, genre } = req.body;
        const game = new Game({ name, genre });
        await game.save();
        res.status(201).json({ message: 'Game created', game });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all games
router.get('/', async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a game
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedGame = await Game.findByIdAndUpdate(id, updates, { new: true });
        res.json(updatedGame);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a game
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Game.findByIdAndDelete(id);
        res.json({ message: 'Game deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
