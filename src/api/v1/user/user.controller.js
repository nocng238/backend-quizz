const { createUserValidate, updateUserValidate } = require('./user.validate');
const {
  getUsersService,
  createUserService,
  getUserService,
  isEmailExisted,
  updateUserService,
  deleteUserService,
  resetPasswordService,
} = require('./user.service');

const getUsers = async (req, res) => {
  try {
    const search = req.query.search || '';

    const filters = {
      status: req.query.status || 'all',
    };

    const options = {
      page: parseInt(req.query.page) - 1 || 0,
      limit: parseInt(req.query.limit) || 10,
    };

    const sortKey = req.query.sort_key || 'createdAt';
    const sortValue = req.query.sort_value || 'DESC';
    const sort = {
      [sortKey]: sortValue,
    };

    const users = await getUsersService(search, sort, filters, options);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { error } = createUserValidate.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
    }

    const { email } = req.body;

    const emailExisted = await isEmailExisted(email);
    if (emailExisted) {
      res.status(400).json({ message: 'This email already existed' });
    }

    const user = await createUserService(req.body);

    res.status(200).json({
      message: 'Create user successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await getUserService(userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;

  const { error } = updateUserValidate.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
  }

  try {
    const userExisted = await getUserService(userId);
    if (!userExisted) {
      res.status(400).json({ message: 'User does not exist' });
    }

    const user = await updateUserService(userId, req.body);

    res.status(200).json({
      message: 'Update user successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const userExisted = await getUserService(userId);
    if (!userExisted) {
      res.status(404).json({ message: 'User does not exist' });
    }

    await deleteUserService(userId);

    res.status(200).json({ message: 'Delete user successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  const userId = req.params.id;

  try {
    const userExisted = await getUserService(userId);
    if (!userExisted) {
      res.status(404).json({ message: 'User does not exist' });
    }

    const user = await resetPasswordService(userId);

    res.status(200).json({
      message: 'Reset password successfully!',
      user,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  resetPassword,
  deleteUser,
};
