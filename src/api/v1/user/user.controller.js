const { usersList } = require('./user.service');

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

module.exports = { getUsers };
