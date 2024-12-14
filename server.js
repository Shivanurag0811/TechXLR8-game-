const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const playerRoutes = require('./routes/player');
const gameRoutes = require('./routes/game');
const scoreRoutes = require('./routes/score');
require('dotenv').config(); // Load .env file

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Routes
app.use('/api/players', playerRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/scores', scoreRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
