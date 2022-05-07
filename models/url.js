const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
  urlCode: String,
  urlOriginal: String,
  urlShort: String,
  accessCount: {
    type: Number,
    default: 0
  },
}, { timestamps: true });

module.exports = mongoose.model('Url', URLSchema);
