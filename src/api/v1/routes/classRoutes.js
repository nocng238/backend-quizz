const express = require('express');

const router = express.Router();

const classController = require('../controllers/classController');

const { auth, verifyAdminRole } = require('../middlewares/auth');

//get classes
router.get('/', auth, verifyAdminRole, classController.getClasses);
//create class
router.post('/', auth, verifyAdminRole, classController.createClass);

//update classes

//delete classes

module.exports = router;
