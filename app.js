const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

require('dotenv').config();

// Mongo Connection
const connection = require('./config/db.config');
connection.once('open', () => console.log('DB Connected'));
connection.on('error', () => console.log('Error'));

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json()); // parse req.body

app.use(cors());

app.get('/api-testing', (req, res) => {
  res.json({
    success: true,
    message: "Backend is working"
  })
});

app.use('/api', require('./routes/redirect'));
app.use('/api/url', require('./routes/url'));

const PORT = process.env.PORT || 8010;
app.listen(PORT, console.log(`server started, listening PORT ${PORT}`));
