const express = require('express');

const { forgotPassword } = require('./user.controller');
const User = require('./user.model');

const router = express.Router();

// GET - domain.com/api/v1/users
router.get('/', async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});



// patch - domain.com/api/v1/users/forgotPass
router.patch('/forgotPass', forgotPassword);

// POST - domain.com/api/v1/users
router.post('/', async (req, res) => {
  const users = await User.create({
    name: 'trung',
    email: 'testgame2221@gmail.com',
    phone: '123123',
    password: '123456',
  });
  res.status(200).json(users);
});

module.exports = router;