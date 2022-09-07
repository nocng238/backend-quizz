const { forgotPass, sendGmail, checkExist } = require('./user.service');
const { mailValidate } = require('./user.validate');
const bcrypt = require('bcrypt');
const generator = require('generate-password');

const forgotPassword = async (req, res) => {
  const mail = req.body.email;
  const randomPassword = generator.generate({
    length: 6,
    numbers: true,
  });
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(randomPassword, salt);
  const changePass = {
    password: hashPassword,
    verified_date: null,
  };

  const { error } = mailValidate.validate(req.body);
  if (error) {
    return res.status(400).json({ meassage: error.message });
  }

  const checkMail = await checkExist(mail);
  if (!checkMail) {
    return res.json({
      success: false,
      error: 'Email does not exist!!!',
    });
  }

  try {
    const user = await forgotPass(mail, changePass);
    //send mail
    await sendGmail(randomPassword, user.email);

    res.status(200).json({
      msg: 'Password has been sent to email!',
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};

module.exports = {
  forgotPassword,
};
