const express = require('express');
const router = express.Router();

// domain.com/api/v1/users
router.use('/users', require('./user/user.route'));

module.exports = router;
