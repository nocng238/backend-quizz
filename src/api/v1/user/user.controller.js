const {
  updatePassword,
  sendGmail,
  checkExistEmail,
  checkExistId,
} = require('./user.service');
const { mailValidate, passwordValidate } = require('./user.validate');
const bcrypt = require('bcrypt');
const { secretKey, frontendUrl } = require('../../../configs/index');
const jwt = require('jsonwebtoken');

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

    const secret = secretKey + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: '24h',
    });

    const link = `${frontendUrl}/resetpassword/${oldUser._id}/${token}`;
    res.status(200).json({
      message: 'Password reset link sent to your email account',
    });

    await sendGmail(link, oldUser.email);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const checkLink = async (req, res) => {
  const { id, token } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid link' });
  }

  const oldUser = await checkExistId(id);
  if (!oldUser) {
    return res.status(400).json({ message: 'Invalid link' });
  }
  const secret = secretKey + oldUser.password;
  try {
    jwt.verify(token, secret);
    res.status(200).json({ message: 'verify' });
  } catch (error) {
    res.status(400).json({ message: 'Not Verified' });
  }
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const { error } = passwordValidate.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      message: 'User Not Exists!!',
    });
  }

  const oldUser = await checkExistId(id);
  if (!oldUser) {
    return res.status(400).json({
      message: 'User Not Exists!!',
    });
  }

  const secret = secretKey + oldUser.password;
  try {
    jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await updatePassword(id, encryptedPassword);

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
