const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    region: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Player', PlayerSchema);
