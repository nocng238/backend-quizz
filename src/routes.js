const express = require('express');

const router = express.Router();

// domain.com/api/v1
router.use('/api/v1', require('./api/v1/routes-v1'))

module.exports = router;
