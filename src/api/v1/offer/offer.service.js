const Offer = require('./offer.model');

const createOffersService = async (cvs, detail) => {
  const { content, startDate } = detail;

  const cvsDetail = cvs.map((cv) => {
    return {
      cv: cv.cvId,
      name: cv.name,
      email: cv.email,
      content,
      startDate,
    };
  });

  const newOffers = Offer.insertMany(cvsDetail);
  return newOffers;
};

module.exports = {
  createOffersService,
};
