const express = require('express');
const router = express.Router();

const {
  forgotPassword,
  checkLink,
  resetPassword,
  putPassFirstLogin,
  login
} = require('./auth.controller');
const User = require('../user/user.model');

// POST - domain.com/api/v1/auth/login
router.post('/login', login);

// GET - domain.com/api/v1/users
router.get('/', async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

router.post('/forgot-password', forgotPassword);
router.get('/reset-password/:token', checkLink);
router.post('/reset-password/:token', resetPassword);
router.put('/change-password-first-login/:id', putPassFirstLogin);

module.exports = router;
