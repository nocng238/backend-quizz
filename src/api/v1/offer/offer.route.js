const express = require('express');
const router = express.Router();
const {
  sendMailOffer,
  changeOfferStatus,
  createOffer, 
  sendMailRejectOffer
} = require('./offer.controller');

router.post('/', createOffer);

router.post('/send-mail-reject-offer', sendMailRejectOffer);

router.post('/send-mail-offer', sendMailOffer);

router.put('/update-status/:id', changeOfferStatus);

module.exports = router;  
