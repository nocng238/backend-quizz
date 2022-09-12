const express = require('express');

const router = express.Router();

const { getUsers, postUser, detailUser, putUser } = require('./user.controller');

// GET - domain.com/api/v1/users/:id
router.get('/:id', detailUser);

// GET - domain.com/api/v1/users
router.get('/', getUsers);

router.post('/', postUser);

// PUT - domain.com/api/v1/users/:id
router.put('/:id', putUser)

module.exports = router;
