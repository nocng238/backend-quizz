const route = require('express').Router();
const upload = require('../middlewares/upload');
const uploadImage = require('../middlewares/uploadImage');
const { auth } = require('../middlewares/auth');
const uploadController = require('../controllers/uploadController');

route.post('/', uploadImage, upload, auth, uploadController.uploadDoc);

module.exports = route;
