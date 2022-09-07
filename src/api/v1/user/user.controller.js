const { usersList } = require('./user.service');

const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const status = req.query.status || 'all';

    res.status(200).json(await usersList(search, status, page, limit));
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getUsers };
