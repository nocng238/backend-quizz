const express = require('express');

const router = express.Router();
const upload = require('../middlewares/upload');
const uploadImage = require('../middlewares/uploadImage');
const uploadController = require('../controllers/uploadController');
const assignmentController = require('../controllers/assignmentController');
const {
  auth,
  verifyAdminRole,
  verifyTeacherRole,
  verifyStudentRole,
} = require('../middlewares/auth');
//teacher routes
router.post(
  '/',
  auth,
  verifyTeacherRole,
  assignmentController.createAssignment
);
router.post(
  '/createByImportFile',
  auth,
  verifyTeacherRole,
  uploadImage,
  upload.uploadDoc,
  uploadController.uploadDoc,
  assignmentController.createAssignment
);

router.get('/', auth, verifyTeacherRole, assignmentController.getAssignments);
router.get('/:id', auth, assignmentController.getAssignment);
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
