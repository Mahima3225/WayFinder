// backend/models/Guide.js
const mongoose = require('mongoose');

const GuideSchema = new mongoose.Schema({
  website: { type: String, required: true },
  steps: { type: Array, required: true },
  instructions: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Guide', GuideSchema);
