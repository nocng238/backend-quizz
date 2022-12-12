const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    // check ac token
    const token = req.header('Authorization');
    if (!token) {
      return res.status(400).json({ msg: 'Authentication failed.' });
    }

    // validate
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        return res.status(400).json({ msg: 'Authentication failed.' });
      }
      // success
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const verifyAdminRole = async (req, res, next) => {
  const { role } = req.user;
  if (role !== 0) {
    res.status(403).json({
      err: 'Admin resource. Access denied.',
    });
  } else {
    next();
  }
};
const verifyTeacherRole = async (req, res, next) => {
  const { role } = req.user;
  if (role !== 1) {
    res.status(403).json({
      err: 'Teacher resource. Access denied.',
    });
  } else {
    next();
  }
};
const verifyStudentRole = async (req, res, next) => {
  const { role } = req.user;
  if (role !== 2) {
    res.status(403).json({
      err: 'Student resource. Access denied.',
    });
  } else {
    next();
  }
};

module.exports = {
  auth,
  verifyAdminRole,
  verifyTeacherRole,
  verifyStudentRole,
};
