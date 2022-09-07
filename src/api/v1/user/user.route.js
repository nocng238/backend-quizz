const express = require('express');
const userController = require('./user.controller');

const User = require('./user.model');

const router = express.Router();


router.post('/', async (req, res) => {
  const user = await User.create({
    name: 'test create user',
    email: 'testuser01@gmail.com',
    password: '1231231234',
  });
  res.status(200).json(user);
});

//register an user!
router.post('/create', userController.createUser)


module.exports = router;
