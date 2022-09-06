const { getUser } = require('./user.service');

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

module.exports = {
  detailUser,
};
