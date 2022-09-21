const {
  createOffersService,
  sendMailRejectOfferService,
} = require('./offer.service');
const { createOffersValidate } = require('./offer.validate');

const { sendMailOfferService, findOfferService, changeOfferStatusService } = require('./offer.service');
const { secretKey, frontendUrl } = require('../../../configs/index');

const createOffer = async (req, res) => {
  try {
    var { cvs, content, startDate } = req.body;

    const { error } = createOffersValidate.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const today = new Date();
    if (Date.parse(startDate) < today.setHours(0, 0, 0, 0)) {
      return res
        .status(400)
        .json({ message: 'This date is not lower than the current date' });
    }
    const detailOffer = { content, startDate };
    const savedOffer = await createOffersService(cvs, detailOffer);

    res.status(200).json(savedOffer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const sendMailOffer = async (req, res) => {
  try {
    const offer = await findOfferService(req.body)
    if (!offer) {
      return res.status(404).json({ message: "Offer is not exists" })
    }

    const link = `${frontendUrl}/offers/accepted/${offer._id}`;

    sendMailOfferService(offer, link);

    return res.status(200).json({
      message: 'Send email successfully',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const changeOfferStatus = async (req, res) => {
  try {

    const offer = await findOfferService(req.body)
    if (!offer) {
      return res.status(404).json({ message: "This offer is not exists" })
    }

    changeOfferStatusService({ id: offer._id, status: offer.status })

    return res.status(200).json({
      message: 'Change offer status successfully',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const sendMailRejectOffer = async (req, res) => {
  try {
    sendMailRejectOfferService(req.body);

    return res.status(200).json({
      message: 'Send email successfully',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendMailOffer, changeOfferStatus, createOffer, sendMailRejectOffer
};
