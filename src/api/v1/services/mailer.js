const nodemailer = require('nodemailer');

const { mailUser, mailPassword } = require('../../../configs/mailer');

const sendMail = ({ content, subject, mailTo }) => {
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mailUser,
      pass: mailPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  mailTransporter.sendMail({
    from: mailUser,
    to: mailTo,
    subject: subject,
    html: content,
  });
};

module.exports = {
  sendMail,
};
