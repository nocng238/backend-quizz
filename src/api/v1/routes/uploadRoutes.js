const route = require('express').Router();
const upload = require('../middlewares/upload');
const uploadImage = require('../middlewares/uploadImage');
const auth = require('../api/v1/middlewares/auth');
const uploadController = require('../auth/controllers/uploadController');

route.post(
  '/api/upload',
  uploadImage,
  upload,
  auth,
  uploadController.uploadAvar
);

module.exports = route;
