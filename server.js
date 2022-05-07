const express = require('express');
const app = express();

require('dotenv').config();

// Mongo Connection
const connection = require('./config/db.config');
connection.once('open', () => console.log('DB Connected'));
connection.on('error', () => console.log('Error'));

app.use(
  express.json({
    extended: false,
  })
); //parse data to JSON

app.get('/api-testing', (req, res) => {
  res.json({
    success: true,
    message: "Backend is working"
  })
});

const PORT = process.env.PORT || 8010;
app.listen(PORT, console.log(`server started, listening PORT ${PORT}`));
