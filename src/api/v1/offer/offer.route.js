const express = require('express');
const router = express.Router();

const { createOffer, sendMailRejectOffer } = require('./offer.controller');

router.post('/', createOffer);

router.post('/send-mail-reject-offer', sendMailRejectOffer);

module.exports = router;
