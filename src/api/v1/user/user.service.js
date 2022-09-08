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

module.exports = {
  usersList,
  getUser,
};
