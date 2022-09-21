const { sendMail } = require('../services/mailer');
const { mailTemplates } = require('../../../configs/mailer');
const { replaceContent } = require('../helpers');

const Offer = require('./offer.model');

const { rejectOffer } = mailTemplates;

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

const sendMailRejectOfferService = (emails) => {
  for (item of emails) {
    const mailParams = {
      mailTo: item.email,
      subject: rejectOffer.subject,
      content: replaceContent(rejectOffer.content, {
        name: item.name,
      }),
    };
    sendMail(mailParams);
  }
};

module.exports = {
  sendMailRejectOfferService,
  createOffersService,
};
