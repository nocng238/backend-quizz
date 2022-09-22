const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'This is API version 1' });
});

router.use('/auth', require('./auth/auth.route'));

router.use('/users', require('./user/user.route'));

module.exports = router;
