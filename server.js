const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import Routes
const playerRoutes = require('./routes/playerRoutes');
const gameRoutes = require('./routes/gameRoutes');
const scoreRoutes = require('./routes/scoreRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/players', playerRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/scores', scoreRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Gaming Leaderboard System is Running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
