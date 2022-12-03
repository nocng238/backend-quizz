const User = require('../models/userModel');
const validateEmail = require('../helpers/validateEmail');
const bcrypt = require('bcryptjs');
const userController = {
  createUser: async (req, res) => {
    try {
      // get info
      const { userName, name, email, role } = req.body;

      // check fields
      if (!name || !email || !userName || !role)
        return res.status(400).json({ msg: 'Please fill in all fields.' });

      // check email
      if (!validateEmail(email))
        return res
          .status(400)
          .json({ msg: 'Please enter a valid email address.' });

      // check user
      const user = await User.findOne({ userName: userName.toLowerCase() });
      if (user) {
        return res
          .status(400)
          .json({ msg: 'This username is already registered in our system.' });
      }

      // check password
      if (userName.length < 6)
        return res
          .status(400)
          .json({ msg: 'Username must be at least 6 characters.' });

      // hash password
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(userName, salt);

      const newUser = new User({
        userName,
        name,
        email,
        password: hashPassword,
        role,
      });
      await newUser.save();
      res.status(200).json({ msg: 'Create user successfully.' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
    } catch (error) {}
  },
};

module.exports = userController;
