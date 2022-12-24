const User = require('../models/userModel');
const validateEmail = require('../helpers/validateEmail');
const bcrypt = require('bcryptjs');
const APIFeatures = require('../utils/api_features');
const { query } = require('express');
const userController = {
  createUser: async (req, res) => {
    try {
      // get info
      const { userName, name, role } = req.body;

      // check fields
      if (!name || !userName || !role)
        return res.status(400).json({ msg: 'Please fill in all fields.' });

      // check email

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
        email: `${userName}@dut.udn.vn`,
        password: hashPassword,
        role,
      });
      await newUser.save();
      res.status(200).json({ msg: 'Create user successfully.' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  getUsers: async (req, res) => {
    try {
      // console.log(req.query);
      const query = {
        ...req.query,
        limit: req.query.limit || 5,
        page: req.query.page || 1,
      };
      const features = new APIFeatures(
        User.find(null, '-avatar -password'),
        query
      )
        .filtering()
        .paginating()
        .sorting();
      const users = await features.query;
      const totalUsers = await User.find(null);
      const total = totalUsers.length;
      res.status(200).json({ users, total });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(
        userId,
        '-password -createdAt -updatedAt'
      );
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateUserProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const { name, email, phone, avatar, address } = req.body;

      await User.updateOne(
        { _id: userId },
        { name, email, phone, avatar, address }
      );
      res.status(200).json({ message: 'update success' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateUserPassword: async (req, res) => {
    try {
      const userId = req.user.id;
      const { oldPassword, newPassword } = req.body;
      const user = await User.findById(userId);
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Wrong password' });
      }
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(newPassword, salt);
      await User.updateOne({ _id: userId }, { password: hashPassword });
      res.status(200).json({ message: 'Password was updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  resetPassword: async (req, res) => {},
};

module.exports = userController;
