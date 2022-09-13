const express = require('express');

const router = express.Router();

const {
  getUsers,
  postUser,
  detailUser,
  putUser,
  resetPassword,
} = require('./user.controller');

router.get('/', getUsers);

router.get('/:id', detailUser);

router.post('/', postUser);

router.post('/resetPass/:id', resetPassword);

router.put('/:id', putUser);

module.exports = router;
