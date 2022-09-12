const express = require('express');
const userController = require('./user.controller');

const router = express.Router();

const { getUsers, postUser } = require('./user.controller');

// GET - domain.com/api/v1/users
router.get('/', getUsers);

router.post('/', postUser);

module.exports = router;
