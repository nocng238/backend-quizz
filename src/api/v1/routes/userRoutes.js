const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const {
  auth,
  verifyAdminRole,
  verifyTeacherRole,
} = require('../middlewares/auth');
// router.get('/', getUsers);

router.post('/', auth, verifyAdminRole, userController.createUser);

// router.get('/:id', getUser);

// router.put('/:id', updateUser);

// router.delete('/:id', deleteUser);

// router.post('/reset-password/:id', resetPassword);

module.exports = router;
