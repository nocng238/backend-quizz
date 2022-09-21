const express = require('express');
const router = express.Router();

const Offer = require('./offer.model');
const { createOffer } = require('./offer.controller');

router.get('/', async (req, res) => {
  const offer = await Offer.find({}).populate({
    path: 'cv',
  });
  res.status(200).json(offer);
});

router.post('/', createOffer);

module.exports = router;
