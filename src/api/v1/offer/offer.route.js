const express = require('express');
const router = express.Router();

const { createOffer } = require('./offer.controller');

router.post('/', createOffer);

module.exports = router;
