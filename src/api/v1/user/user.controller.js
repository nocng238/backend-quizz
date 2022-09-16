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
  deleteUser,
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
      return res.status(400).json({ message: error.message });
    }
    // check e-mail
    const emailExisted = await checkEmailExisted(email);
    if (emailExisted) {
      return res.status(400).json({ message: 'This email already exists!!!' });
    }

    // phone validate
    if (!checkFormatPhone(phone)) {
      return res
        .status(400)
        .json({ meassage: 'Phone number must be greater than 10 and be number!' });
    }

    const newUser = await createUser(req.body);

    //send mail
    const subjectMail =
      'Email notification of successful user account creation';

    const htmlMail = 'Thank you for signing up to Devplus! your password is: ';

    sendGmail(newUser.randomPassword, email, subjectMail, htmlMail);

    res.status(200).json({
      message: 'Create user successfully!',
      user: newUser.user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
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
    const user = await updateUser(userId, changePass);

    const subjectMail = 'Password reset confirmation email';
    const htmlMail = 'Your password is :';
    //send mail
    await sendGmail(randomPassword, user.email, subjectMail, htmlMail);

    res.status(200).json({
      message: 'Reset password successfully!',
    });
  } catch (error) {
    res.status(404).json({
      error: 'Email does not exist!!!',
    });
  }
};

const deleteUsers = async (req, res) => {
  const userId = req.params.id;
  const userExisted = await checkExistingUser(userId);

  if (userExisted == false) {
    return res
      .status(404)
      .json({ message: 'User does not exist or has been deleted' });
  }

  try {
    await deleteUser(userId);
    res.status(200).json({ message: 'Delete User Successfully' });
  } catch (err) {
    res.status(404).json({ message: 'Page Not Found' });
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
