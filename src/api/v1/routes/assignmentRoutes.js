const express = require('express');

const router = express.Router();

const assignmentController = require('../controllers/assignmentController');
const {
  auth,
  verifyAdminRole,
  verifyTeacherRole,
} = require('../middlewares/auth');
router.post(
  '/',
  auth,
  verifyTeacherRole,
  assignmentController.createAssignment
);

router.get('/', auth, verifyTeacherRole, assignmentController.getAssignments);
router.get('/:id', auth, verifyTeacherRole, assignmentController.getAssignment);
router.patch(
  '/:id',
  auth,
  verifyTeacherRole,
  assignmentController.editAssignment
);
router.delete(
  '/:id',
  auth,
  verifyTeacherRole,
  assignmentController.deleteAssignment
);
module.exports = router;
