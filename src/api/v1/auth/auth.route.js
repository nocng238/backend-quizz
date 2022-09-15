const express = require('express');
const router = express.Router();

const { login } = require('./auth.controller');

// POST - domain.com/api/v1/auth/login
router.post('/login', login);

module.exports = router;
