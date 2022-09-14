const express = require('express');

const {
  forgotPassword,
  checkLink,
  resetPassword,
} = require('./auth.controller');
const User = require('../user/user.model');

const router = express.Router();

// GET - domain.com/api/v1/users
router.get('/', async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

router.post('/forgot-password', forgotPassword);
router.get('/reset-password/:token', checkLink);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
