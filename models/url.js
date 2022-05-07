const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
  urlCode: String,
  urlOriginal: String,
  accessCount: Number,
}, { timestamps: true });

module.exports = mongoose.model('Url', URLSchema);
