const { getUser } = require('./user.service');
const userServices = require('./user.service');

const detailUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await getUser(userId);
    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: user.status,
      },
    });
  } catch (error) {
    return res.status(400).json({ error: 'User does not exist!!!' });
  }
};

const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const status = req.query.status || 'all';

    res
      .status(200)
      .json(await userServices.getUsers(search, status, page, limit));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getUsers,
  detailUser,
};
