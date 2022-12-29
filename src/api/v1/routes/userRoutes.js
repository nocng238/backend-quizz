const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const {
  auth,
  verifyAdminRole,
  verifyTeacherRole,
} = require('../middlewares/auth');
router.get('/', auth, verifyAdminRole, userController.getUsers);

router.post('/', auth, verifyAdminRole, userController.createUser);

router.get('/profile', auth, userController.getUser);

router.get('/student', auth, verifyAdminRole, userController.getStudents);

router.get('/teacher', auth, verifyAdminRole, userController.getTeachers);

router.patch('/profile', auth, userController.updateUserProfile);

router.patch(
  '/profile/updatePassword',
  auth,
  userController.updateUserPassword
);

// router.post('/reset-password/:id', resetPassword);

module.exports = router;
