const express = require('express');

const router = express.Router();

const {
  getUsers,
  postUser,
  detailUser,
  putUser,
  resetPassword,
} = require('./user.controller');

// GET - domain.com/api/v1/users/:id
router.get('/:id', detailUser);

router.get('/', getUsers);

router.post('/', postUser);

router.put('/:id', putUser);

router.patch('/resetPass/:id', resetPassword);

module.exports = router;
