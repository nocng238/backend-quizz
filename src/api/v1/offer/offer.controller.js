const {
  createOffersService,
  sendMailRejectOfferService,
} = require('./offer.service');
const { createOffersValidate } = require('./offer.validate');

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

module.exports = { createOffer, sendMailRejectOffer };
