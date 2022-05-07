const mongoose = require('mongoose');

const mongodb = process.env.MONGODB || 'mongodb://localhost:27017/shortster';

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

module.exports = connection;
