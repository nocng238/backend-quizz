const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'This is API version 1' });
});

router.use('/auth', require('./routes/authRoutes'));

router.use('/user', require('./routes/userRoutes'));

router.use('/assignment', require('./routes/assignmentRoutes'));

router.use('/quizz', require('./routes/quizzRoutes'));

router.use('/upload', require('./routes/uploadRoutes'));
module.exports = router;
