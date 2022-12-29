const createToken = require('../helpers/createToken');
const validateEmail = require('../helpers/validateEmail');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authController = {
  signing: async (req, res) => {
    try {
      // get cred
      const { userName, password } = req.body;

      // check username
      let user = await User.findOne({ userName }).select(
        '-createdAt -updatedAt'
      );
      if (!user)
        return res
          .status(400)
          .json({ message: 'This user name is not registered in our system.' });

      // check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: 'This password is incorrect.' });

      // refresh token
      const ac_token = createToken.access({ id: user._id, role: user.role });
      // signing success
      const { avatar, name, role } = user;
      res
        .status(200)
        .json({
          message: 'Signing success',
          ac_token,
          user: { avatar, name, role },
        });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  access: async (req, res) => {
    try {
      // rf token
      const rf_token = req.cookies._apprftoken;
      if (!rf_token)
        return res.status(400).json({ message: 'Please sign in.' });

      // validate
      jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
        if (err)
          return res.status(400).json({ message: 'Please sign in again.' });
        // create access token
        const ac_token = createToken.access({ id: user.id, role: user.role });
        // access success
        return res.status(200).json({ ac_token });
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  signout: async (req, res) => {
    try {
      // clear cookie
      res.clearCookie('_apprftoken', { path: '/api/v1/auth/access' });
      // success
      return res.status(200).json({ message: 'Signout success.' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = authController;
