const nodemailer = require('nodemailer');

const User = require('../user/user.model');
const { mailUser, passMail } = require('../../../configs/index');

const findUser = async (email) => {
  return await User.findOne({ email })
}

const updatePassword = async (id, password) => {
  const forgotPass = await User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        password: password,
      },
    }
  );
  return forgotPass;
};

const checkExistEmail = async (email) => {
  const checkMail = await User.findOne({ email: email });
  return checkMail;
};

const checkExistId = async (id) => {
  const oldUser = await User.findOne({ _id: id });
  return oldUser;
};

const sendGmail = (link, mail) => {
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
    html: `Click the link to change the password: ${link}`,
  };
  mailTransporter.sendMail(details);
};

const changePassFirstLogin = async (id, body) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      $set: body,
    },
    { new: true }
  );

  // return updated user if change password success
  return updatedUser;
};

module.exports = {
  updatePassword,
  sendGmail,
  checkExistEmail,
  checkExistId,
  changePassFirstLogin,
  findUser
};
