const express = require('express');
const userController = require('./user.controller');

const User = require('./user.model');

const router = express.Router();

const { getUsers } = require('./user.controller');

// GET - domain.com/api/v1/users
router.get('/', getUsers);

//register an user!
router.post('/create',userController.createUser) 


module.exports = router;
