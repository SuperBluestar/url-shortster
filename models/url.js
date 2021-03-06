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

URLSchema.post("findOne", async function (doc) {
  if (doc) {
    doc.accessCount = (doc.accessCount ?? 0) + 1;
    await doc.save();
  }
});

module.exports = mongoose.model('Url', URLSchema);
