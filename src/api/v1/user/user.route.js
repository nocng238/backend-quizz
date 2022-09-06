const express = require('express');
const User = require('./user.model');
const router = express.Router();
const { detailUser } = require('./user.controller');

// GET - domain.com/api/v1/users/:id
router.get('/:id', detailUser);

// GET - domain.com/api/v1/users
router.get('/', async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// POST - domain.com/api/v1/users
router.post('/', async (req, res) => {
  const users = await User.create({
    username: 'test',
    email: 'test@gmail.com',
    password: '123123',
  });
  res.status(200).json(users);
});

module.exports = router;
