const nodemailer = require('nodemailer');
const generator = require('generate-password');
const bcrypt = require('bcrypt');

const User = require('./user.model');

const { STATUS_OPTIONS } = require('../../../constants/User');

const getUser = async (id_user) => {
  const user = await User.findById({ _id: id_user });
  return user;
};

const usersList = async (search, filters = {}, options = {}) => {
  filters.status === 'all'
    ? (filters.status = [...STATUS_OPTIONS])
    : (filters.status = filters.status.split(','));

  const limit = options.limit;
  const offset = options.page * options.limit;

  const condition = {
    status: { $in: [...filters.status] },
    $and: [
      {
        $or: [{ name: { $regex: search } }, { email: { $regex: search } }],
      },
      { deleted_at: null },
    ],
  };

  const data = await User.paginate(condition, { offset, limit });

  const usersPaginate = {
    total: data.totalDocs,
    page: data.page,
    limit: data.limit,
    status: filters.status,
    users: data.docs,
  };

  return usersPaginate;
};

const emailCheck = async (email) => {
  const result = await User.findOne({ email });
  return result ? true : false;
};

const checkFormatPhone = (phone) => {
  if (phone !== /^[0-9]+$/ && phone.length < 10) {
    return false;
  }
  return true;
};

const createUser = async (username, email, phone) => {
  const randomPassword = generator.generate({
    length: 6,
    numbers: true,
  });

  //hash passwork
  const passwordHash = await bcrypt.hash(randomPassword, 12);

  const newUser = new User({ username, email, phone, password: passwordHash });

  const savedUser = await newUser.save();

  return {
    user: savedUser,
    randomPassword,
  };
};

const sendGmail = (pass, mail) => {
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'quy.nguyen@devplus.edu.vn',
      pass: 'quyquy111@',
    },
  });

  let details = {
    from: 'quy.nguyen@devplus.edu.vn',
    to: mail,
    subject: 'Registration confirmation letter',
    text: 'Send Gmail to notify ✔',
    html: ` Thank you for signing up to Devplus! your password is: <b>${pass}</b>`,
  };
  mailTransporter.sendMail(details, (error) => {
    if (error) {
      console.log('Send mail is error!');
    } else {
      console.log('Send mail is OK!');
    }
  });
};

module.exports = {
  usersList,
  sendGmail,
  createUser,
  emailCheck,
  getUser,
  checkFormatPhone,
};
