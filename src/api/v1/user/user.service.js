const User = require('./user.model');
const nodemailer = require('nodemailer');
const { mailUser, passMail } = require('../../../configs/index');

const forgotPass = async (email, body) => {
  const forgotPass = await User.findOneAndUpdate(
    {
      email: email,
    },
    {
      $set: body,
    },
    { new: true }
  );
  return forgotPass;
};
const checkExist = async (email) => {
  const checkMail = await User.findOne({ email: email });
  return checkMail;
};
const sendGmail = (pass, mail) => {
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
      user: mailUser,
      pass: passMail,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let details = {
    from: mailUser,
    to: mail,
    subject: 'Confirmation letter forgot password',
    html: `Your password is: <b>${pass}</b>`,
  };
  mailTransporter.sendMail(details, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Send mail is OK!');
    }
  });
};
module.exports = {
  forgotPass,
  sendGmail,
  checkExist,
};
