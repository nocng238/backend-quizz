const jwt = require('jsonwebtoken');

const {
  usersList,
  emailCheck,
  checkFormatPhone,
  createUser,
  sendGmail,
  getUser,
  putUser, 
  checkExistingUser,
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
    const { username, email, phone } = req.body;

    const { error, value } = createValidate.validate(req.body);
    if (error) {
      return res.json({ meassage: error.message });
    }

    // check e-mail
    const emailExisted = await emailCheck(email);
    if (emailExisted) {
      return res.status(400).json({ msg: 'This email already exists!!!' });
    }

    // phone validate
    if (!checkFormatPhone(phone)) {
      return res
        .status(400)
        .json({ msg: 'Phone number must be greater than 10 and be number!' });
    }

    const newUser = await createUser(username, email, phone);

    const access_token = createAccessToken({ id: newUser.user._id });
    const refresh_token = createRefreshToken({ id: newUser.user._id });

    res.cookie('refrestoken', refresh_token, {
      httpOnly: true,
      path: '/api/v1/refresh_token',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    //send mail
    await sendGmail(newUser.randomPassword, email);

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

const updateUser = async (req, res) => {
  const usertId = req.params.id;
  let userBody;
  
  try {
    // check existed user
    if ((await checkExistingUser(usertId))) {
      try {
        // validate form
        userBody = await updateValidate.validateAsync({ 
          name: req.body.name, 
          phone: req.body.phone, 
          status: req.body.status
        });
        try {
          // update user to mongodb
          const userUpdated = await putUser(usertId, userBody) 
          res
            .status(200)
            .json({
              "message": "Update user successfully", 
              "user": {
                "name": userUpdated.name, 
                "phone": userUpdated.phone
              }
            });
        } catch (error) {
          res.status(500).json({ "message": "Error", error });
        }
      } catch (err) { 
        res.status(400).json({ "message": "Form validation fail", "errorDetails": err.details });
      }
    } else {
      res.status(404).json({ "message": "User not exists" });
    }
  } catch (error) {
    res.status(500).json({ "message": "Error", error });
  }
};

module.exports = {
  getUsers,
  postUser,
  detailUser,
  updateUser,
};
