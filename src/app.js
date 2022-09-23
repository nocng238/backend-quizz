const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('./database');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('MongoDB connected successfully');
});

// domain.com
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Dev Plus 1',
  });
});

app.use('/', require('./routes'));

module.exports = app;
