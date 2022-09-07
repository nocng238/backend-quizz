const express = require('express');

const router = express.Router();

const { getUsers, postUser, detailUser } = require('./user.controller');

// GET - domain.com/api/v1/users/:id
router.get('/:id', detailUser);

// GET - domain.com/api/v1/users
router.get('/', getUsers);

router.post('/create', postUser);

module.exports = router;
