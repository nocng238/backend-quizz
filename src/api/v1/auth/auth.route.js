const express = require('express');
const router = express.Router();

const { login } = require('./auth.controller');

// POST - domain.com/api/v1/auth
router.post('/', login);

module.exports = router;
