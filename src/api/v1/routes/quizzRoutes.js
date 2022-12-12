const express = require('express');

const router = express.Router();

const assignmentController = require('../controllers/assignmentController');
const answerController = require('../controllers/answerController');
const {
  auth,
  verifyAdminRole,
  verifyTeacherRole,
  verifyStudentRole,
} = require('../middlewares/auth');

//teacher routes
router.get(
  '/',
  auth,
  verifyStudentRole,
  assignmentController.studentGetAssignments
);
router.post('/', auth, verifyStudentRole, answerController.submitAnswer);

router.get(
  '/history',
  auth,
  verifyStudentRole,
  answerController.getAnswersHistory
);
//teacher routes
router.get(
  '/getSubmissions/:id',
  auth,
  verifyTeacherRole,
  answerController.getSubmissions
);

module.exports = router;
