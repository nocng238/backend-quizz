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

router.post('/', postUser);

router.put('/:id', putUser);

router.patch('/resetPass/:id', resetPassword);

module.exports = router;
