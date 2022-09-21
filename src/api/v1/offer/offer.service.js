const { sendMail } = require('../services/mailer');
const { mailTemplates } = require('../../../configs/mailer');
const { replaceContent } = require('../helpers');

const Offer = require('./offer.model');
const { sendMail } = require('../services/mailer');
const { mailTemplates } = require('../../../configs/mailer');
const { replaceContent } = require('../helpers');

const { offerConfirm } = mailTemplates;

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

const sendMailOfferService = async (offer, link) => {

  const mailParams = {
    mailTo: offer.email,
    subject: offerConfirm.subject,
    content: replaceContent(offerConfirm.content, {
      name: offer.name,
      link: link,
      content: offer.content
    }),
  };
  sendMail(mailParams);

}

const findOfferService = async (data) => {
  return await Offer.findOne({ email: data.email })
}

const changeOfferStatusService = async (id, status) => {
  const changeStatus = await User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        status: status,
      },
    }
  );
  return changeStatus;
}

module.exports = {
  sendMailOfferService,
  findOfferService,
  changeOfferStatusService,
  createOffersService,
  sendMailRejectOfferService,
};
