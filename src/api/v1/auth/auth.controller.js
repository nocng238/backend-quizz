const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  findUser,
  updatePassword,
  sendGmail,
  checkExistEmail,
  changePassFirstLogin,
} = require('./auth.service');

const {
  loginValidate,
  mailValidate,
  changePassValidate,
} = require('./auth.validate');
const { secretKey, frontendUrl } = require('../../../configs/index');
const { checkExistingUser } = require('../user/user.service');

const login = async (req, res) => {
  const { error } = loginValidate.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const { email, password } = req.body;

    const user = await findUser(email);
    if (!user)
      return res.status(400).json({ message: 'This email does not exits!!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'password is incorrect.' });

    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });

    res.cookie('refreshtoken', refresh_token, {
      httpOnly: true,
      path: '/api/refresh_token',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: 'Login successfully!',
      access_token,
      user: {
        ...user._doc,
        password: '',
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d',
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
  });
};

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

const putPassFirstLogin = async (req, res) => {
  const userId = req.params.id;
  let userBody;

  try {
    await changePassValidate.validateAsync({
      password: req.body.password,
      confirmedPassword: req.body.confirmedPassword,
    });

    try {
      if (await checkExistingUser(userId)) {
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        userBody = {
          password: hashPassword,
          verified_date: Date.now(),
        };

        const userUpdated = await changePassFirstLogin(userId, userBody);

        res.status(200).json({
          message: 'Change password successfully',
          verifiedDate: userUpdated.verified_date,
        });
      } else {
        res.status(404).json({ message: 'User not exists' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error', error });
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Form validation fail', errorDetails: err.details });
  }
};

module.exports = {
  forgotPassword,
  checkLink,
  resetPassword,
  putPassFirstLogin,
  login,
};
