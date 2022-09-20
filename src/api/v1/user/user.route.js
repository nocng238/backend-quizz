const express = require('express');

const router = express.Router();

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  resetPassword,
  deleteUser,
} = require('./user.controller');

router.get('/', getUsers);

router.post('/', createUser);

router.get('/:id', getUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.post('/reset-password/:id', resetPassword);

module.exports = router;
