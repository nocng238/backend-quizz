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
// PORT - domain.com/api/v1/users/resetPass/:id
router.put('/resetPass/:id', resetPassword);

router.put('/:id', putUser);


module.exports = router;
