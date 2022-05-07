const express = require('express');
const bodyParser = require("body-parser");

const server = express();
server.use(
  bodyParser.urlencoded({
    extended: false
  })
);
server.use(bodyParser.json()); // parse req.body

server.use('/api/url', require('./routes/url'));

module.exports = server;