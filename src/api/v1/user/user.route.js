const express = require('express');

const router = express.Router();

const {
  getUsers,
  postUser,
  detailUser,
  putUser,
  resetPassword,
  deleteUsers,
} = require('./user.controller');

router.get('/', getUsers);

router.post('/', postUser);

router.get('/:id', detailUser);

router.delete('/:id', deleteUsers);

router.put('/:id', putUser);

router.post('/reset-password/:id', resetPassword);

module.exports = router;
