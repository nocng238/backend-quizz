const express = require('express');
const userController = require('./user.controller');

const User = require('./user.model');

const router = express.Router();

// GET - domain.com/api/v1/users
router.get('/', async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

//register an user!
router.post('/create',userController.createUser) 


module.exports = router;
