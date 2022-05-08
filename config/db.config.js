const mongoose = require('mongoose');

require('dotenv').config();

const mongodb = process.env.NODE_ENV === "production" ? process.env.MONGODB : 'mongodb://localhost:27017/test-shortster';

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

module.exports = connection;
