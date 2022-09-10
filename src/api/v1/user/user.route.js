const express = require('express');

const {
  forgotPassword,
  checkLink,
  resetPassword,
} = require('./user.controller');
const User = require('./user.model');

const router = express.Router();

// GET - domain.com/api/v1/users
router.get('/', async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// patch - domain.com/api/v1/users/forgotPass
router.post('/forgotPass', forgotPassword);
router.get('/reset-password/:id/:token', checkLink);
router.post('/reset-password/:id/:token', resetPassword);


module.exports = router;
