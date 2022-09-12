const nodemailer = require('nodemailer');
const generator = require('generate-password');
const bcrypt = require('bcrypt');

const User = require('./user.model');
const { mailUser, passMail } = require('../../../configs/index');

const {
  STATUS_OPTIONS,
  ID_VALIDATE_REGEX,
} = require('../../../constants/User');

const getUser = async (id_user) => {
  const user = await User.findById({ _id: id_user });
  return user;
};

const usersList = async (search, filters = {}, options = {}) => {
	filters.status === 'all' ? (filters.status = [...STATUS_OPTIONS]) : (filters.status = filters.status.split(','));

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

const checkEmailExisted = async (email) => {
  return await User.findOne({ email });
};

const checkFormatPhone = (phone) => {
  if (phone !== /^[0-9]+$/ && phone.length < 10) {
    return false;
  }
  return true;
};

const createUser = async (params) => {
  const randomPassword = generator.generate({
    length: 8,
    numbers: true,
  });

  // Hash password
  params.password = await bcrypt.hash(randomPassword, 12);
  const user = await User.create(params);

  return {
    user,
    randomPassword,
  };
};

const resetPass = async (id_user, body) => {
  const resetPass = await User.findByIdAndUpdate(
    id_user,
    {
      $set: body,
    },
    { new: true }
  );
  return resetPass;
};

const sendGmail = (pass, mail, subject, html) => {
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
      user: mailUser,
      pass: passMail,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let details = {
    from: mailUser,
    to: mail,
    subject: subject,
    html: `${html} <b>${pass}</b>`,
  };
  mailTransporter.sendMail(details);
};

const updateUser = async (id, body) => {
  // update user to db
  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      $set: body,
    },
    { new: true }
  );

  // return user after update
  return updatedUser;
};

const checkExistingUser = async (id) => {
  // check user validate id

  if (!id.match(ID_VALIDATE_REGEX)) {
    return false;
  }

  // get user by id
  const result = await User.findOne({ _id: id });

  // return true if user existing
  return !!result;
};

module.exports = {
  usersList,
  sendGmail,
  createUser,
  checkEmailExisted,
  checkFormatPhone,
  updateUser,
  getUser,
  checkExistingUser,
  resetPass,
};
