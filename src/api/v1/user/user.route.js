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
// delete - domain.com/api/v1/users/delete/:id
router.delete('/delete/:id', deleteUsers);

router.get('/:id', detailUser);

router.post('/', postUser);

router.post('/resetPass/:id', resetPassword);

router.put('/:id', putUser);

module.exports = router;
