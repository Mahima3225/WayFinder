// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const connectDB = require('./config/db');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();


// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
