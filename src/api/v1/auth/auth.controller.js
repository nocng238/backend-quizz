const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {
  updatePassword,
  sendGmail,
  checkExistEmail,
} = require('./auth.service');
const { mailValidate, changePassValidate } = require('./auth.validate');
const { secretKey, frontendUrl } = require('../../../configs/index');

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const { error } = mailValidate.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const oldUser = await checkExistEmail(email);
    if (!oldUser) {
      return res.status(400).json({
        message: 'User with given email does not exist!',
      });
    }
    if (oldUser.status !== 'active') {
      return res.status(400).json({
        message: 'You cannot change your password at this time',
      });
    }

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      secretKey,
      {
        expiresIn: '24h',
      }
    );

    const link = `${frontendUrl}/reset-password/${token}`;
    res.status(200).json({
      message: 'Password reset link sent to your email account',
    });

    await sendGmail(link, oldUser.email);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const checkLink = async (req, res) => {
  const { token } = req.params;

  try {
    jwt.verify(token, secretKey);
    res.status(200).json({ message: 'verify' });
  } catch (error) {
    res.status(400).json({ message: 'Not Verified' });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const { error } = changePassValidate.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const User = jwt.verify(token, secretKey);

    const encryptedPassword = await bcrypt.hash(password, 10);
    await updatePassword(User.id, encryptedPassword);

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  forgotPassword,
  checkLink,
  resetPassword,
};
