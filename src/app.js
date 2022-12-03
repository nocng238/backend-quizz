const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const mongoose = require('./database');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('MongoDB connected successfully');
});

// domain.com
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to my Online quizz app',
  });
});
app.use('/', require('./routes'));

module.exports = app;
