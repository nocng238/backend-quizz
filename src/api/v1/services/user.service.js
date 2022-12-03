const generator = require('generate-password');
const bcrypt = require('bcrypt');

const { STATUS_OPTIONS } = require('../../../constants/User');
const { sendMail } = require('./mailer');
const { mailTemplates } = require('../../../configs/mailer');

const { createUser, resetPassword } = mailTemplates;

const User = require('../user/user.model');
const { replaceContent } = require('../helpers');

const selectFields = ['_id', 'name', 'email', 'phone', 'status', 'avatar'];

const getUsersService = async (search, sort, { status }, { limit, page }) => {
  status = status === 'all' ? [...STATUS_OPTIONS] : status;

  const offset = page * limit;

  const condition = {
    status: { $in: [...status] },
    $and: [
      {
        $or: [{ name: { $regex: search } }, { email: { $regex: search } }],
      },
      { deleted: false },
    ],
  };

  const data = await User.paginate(condition, {
    offset,
    limit,
    sort,
    select: selectFields,
  });

  const usersPaginate = {
    total: data.totalDocs,
    page: data.page,
    limit: data.limit,
    status: status,
    users: data.docs,
  };

  return usersPaginate;
};

const createUserService = async (params) => {
  const randomPassword = generator.generate({
    length: 8,
    numbers: true,
  });

  const hashPassword = await bcrypt.hash(randomPassword, 12);

  const user = await User.create({ ...params, password: hashPassword });

  const mailParams = {
    mailTo: user.email,
    subject: createUser.subject,
    content: replaceContent(createUser.content, {
      name: user.name,
      email: user.email,
      password: randomPassword,
    }),
  };

  sendMail(mailParams);

  return user;
};

const getUserService = async (userId) => {
  return await User.findOne({ _id: userId, deleted: false }).select(
    selectFields
  );
};

const updateUserService = async (userId, body) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      $set: body,
    },
    { new: true }
  ).select(selectFields);
};

const deleteUserService = async (userId) => {
  await User.deleteById(userId);
};

const resetPasswordService = async (userId) => {
  const randomPassword = generator.generate({
    length: 8,
    numbers: true,
  });

  const hashPassword = await bcrypt.hash(randomPassword, 12);

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        password: hashPassword,
        verifiedDate: null,
      },
    },
    { new: true }
  ).select(selectFields);

  const mailParams = {
    mailTo: user.email,
    subject: resetPassword.subject,
    content: replaceContent(resetPassword.content, {
      name: user.name,
      password: randomPassword,
    }),
  };

  sendMail(mailParams);

  return user;
};

const isEmailExisted = async (email) => {
  return await User.findOne({ email });
};

module.exports = {
  getUsersService,
  createUserService,
  getUserService,
  updateUserService,
  deleteUserService,
  resetPasswordService,
  isEmailExisted,
};
