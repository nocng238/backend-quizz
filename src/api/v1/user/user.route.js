const express = require('express');

const router = express.Router();

const { getUsers, postUser } = require('./user.controller');

// GET - domain.com/api/v1/users
router.get('/', getUsers);

router.post('/create', postUser);

module.exports = router;
