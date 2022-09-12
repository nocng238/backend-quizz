const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'This is API version 1' });
});

// domain.com/api/v1/users
router.use('/users', require('./user/user.route'));

router.use('/auth', require('./auth/auth.route'));

module.exports = router;
