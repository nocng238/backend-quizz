const User = require('./user.model');

const getUser = async (id_user) => {
  const user = await User.findById({ _id: id_user });
  return user;
};

module.exports = {
  getUser,
};
