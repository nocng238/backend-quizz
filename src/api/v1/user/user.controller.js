const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generator = require('generate-password');

const {
  usersList,
  checkEmailExisted,
  checkFormatPhone,
  createUser,
  sendGmail,
  getUser,
  updateUser,
  checkExistingUser,
  resetPass,
} = require('./user.service');
const { createValidate, updateValidate } = require('../user/user.validate');

const detailUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await getUser(userId);
    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: user.status,
      },
    });
  } catch (error) {
    return res.status(400).json({ error: 'User does not exist!!!' });
  }
};

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || '';

    const filters = {
      status: req.query.status || 'all',
    };

    const options = {
      page: parseInt(req.query.page) - 1 || 0,
      limit: parseInt(req.query.limit) || 10,
    };

    const users = await usersList(search, filters, options);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const postUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const { error, value } = createValidate.validate(req.body);
    if (error) {
      return res.json({ meassage: error.message });
    }

    // check e-mail
    const emailExisted = await checkEmailExisted(email);
    if (emailExisted) {
      return res.status(400).json({ msg: 'This email already exists!!!' });
    }

    // phone validate
    if (!checkFormatPhone(phone)) {
      return res
        .status(400)
        .json({ msg: 'Phone number must be greater than 10 and be number!' });
    }

    const newUser = await createUser(req.body);

    const access_token = createAccessToken({ id: newUser.user._id });
    const refresh_token = createRefreshToken({ id: newUser.user._id });

    res.cookie('refrestoken', refresh_token, {
      httpOnly: true,
      path: '/api/v1/refresh_token',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    //send mail
    const subjectMail =
      'Email notification of successful user account creation';
    const htmlMail = 'Thank you for signing up to Devplus! your password is: ';
    sendGmail(newUser.randomPassword, email, subjectMail, htmlMail);

    res.json({
      msg: 'Create user successfully!',
      access_token,
      user: newUser.user,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
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

const putUser = async (req, res) => {
  const userId = req.params.id;
  let userBody;

  try {
    // validate form
    userBody = await updateValidate.validateAsync({
      name: req.body.name,
      phone: req.body.phone,
      status: req.body.status,
    });

    try {
      // check existed user
      const userExisted = await checkExistingUser(userId);
      if (userExisted) {
        try {
          // update user to mongodb
          const userUpdated = await updateUser(userId, userBody);
          res.status(200).json({
            message: 'Update user successfully',
            user: {
              name: userUpdated.name,
              phone: userUpdated.phone,
            },
          });
        } catch (error) {
          res.status(500).json({ message: 'Error', error });
        }
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
const resetPassword = async (req, res) => {
  const userId = req.params.id;
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

  try {
    const user = await resetPass(userId, changePass);

    const subjectMail = 'Password reset confirmation email';
    const htmlMail = 'Your password is :';
    //send mail
    await sendGmail(randomPassword, user.email, subjectMail, htmlMail);

    res.status(200).json({
      msg: 'Reset password successfully!',
    });
  } catch (error) {
    res.status(400).json({
      error: 'Email does not exist!!!',
    });
  }
};

const deleteUsers = async (req, res) => {
  const userId = req.params.id;
  const checkExistedUser = await User.findById(userId);

  if (checkExistedUser == null) {
    return res.status(404).json({ message: 'User does not exist' });
  } else if (checkExistedUser.deleted == true) {
    return res.status(404).json({ message: 'User was deleted' });
  }
  try {
    await User.deleteById(userId);
    res.status(200).json({ message: 'Delete User Successfully' });
  } catch (err) {
    res.status(404).json({ message: ' Page Not Found' });
  }
};

module.exports = {
  getUsers,
  postUser,
  detailUser,
  putUser,
  resetPassword,
  deleteUsers,
};
