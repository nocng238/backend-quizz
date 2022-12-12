const mongoose = require('mongoose');
const moment = require('moment');
const createdAt = moment().format();

const answerSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    assignmentId: {
      type: mongoose.Types.ObjectId,
      ref: 'Assignment',
    },
    answers: {
      type: Object,
      default: {},
    },
    timeStart: String,
    timeEnd: String,
    score: Number,
    corectAnswers: Number,
    numberOfQuestions: Number,
    createdAt: {
      type: String,
      default: createdAt,
    },
  },
  {
    timestamp: true,
  }
);

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
