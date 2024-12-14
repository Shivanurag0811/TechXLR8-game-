const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    genre: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Game', GameSchema);
