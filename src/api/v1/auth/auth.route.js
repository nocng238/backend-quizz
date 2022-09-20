const express = require('express');

const {
  forgotPassword,
  checkLink,
  resetPassword,
  putPassFirstLogin,
  login,
} = require('./auth.controller');

const router = express.Router();

router.post('/login', login);

router.post('/forgot-password', forgotPassword);

router.get('/reset-password/:token', checkLink);

router.post('/reset-password/:token', resetPassword);

router.put('/change-password-first-login/:id', putPassFirstLogin);

module.exports = router;
