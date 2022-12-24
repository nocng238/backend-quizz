const route = require('express').Router();
const upload = require('../middlewares/upload');
const uploadImage = require('../middlewares/uploadImage');
const { auth } = require('../middlewares/auth');
const uploadController = require('../controllers/uploadController');

route.post(
  '/uploadDoc',
  uploadImage,
  upload.uploadDoc,
  auth,
  uploadController.uploadDoc
);
route.post(
  '/uploadAvatar',
  uploadImage,
  upload.uploadAvatar,
  auth,
  uploadController.uploadAvar
);
module.exports = route;
