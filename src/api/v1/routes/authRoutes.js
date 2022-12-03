const { Router } = require('express');
const route = Router();
const authController = require('../controllers/authController');
const {
  auth,
  verifyAdminRole,
  verifyTeacherRole,
} = require('../middlewares/auth');

route.post('/signing', authController.signing);
route.post('/access', authController.access);
route.get('/signout', authController.signout);

module.exports = route;
