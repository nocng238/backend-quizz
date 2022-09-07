const User = require('./user.model');

const usersList = async (search, status, page, limit) => {
  const statusOptions = ['active', 'inactive'];

  status === 'all'
    ? (status = [...statusOptions])
    : (status = status.split(','));

  const users = await User.find({
    $and: [
      {
        $or: [{ name: { $regex: search } }, { email: { $regex: search } }],
      },
      { deleted_at: null },
    ],
  })
    .where('status')
    .in([...status])
    .skip(page * limit)
    .limit(limit);

  const total = await User.countDocuments({
    status: { $in: [...status] },
    $and: [
      {
        $or: [{ name: { $regex: search } }, { email: { $regex: search } }],
      },
      { deleted_at: null },
    ],
  });

  return {
    total,
    page: page + 1,
    limit,
    status,
    users,
  };
};

module.exports = { usersList };
