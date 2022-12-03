const moment = require('moment');
const mongoose = require('mongoose');

const createdAt = moment().format();
const answerSchema = mongoose.Schema({
  title: String,
  isTrue: {
    type: Boolean,
    default: false,
  },
});
const questionSchema = mongoose.Schema({
  title: String,
  answers: [answerSchema],
});

const assignmentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questions: {
      type: [questionSchema],
    },
    duration: {
      type: Number,
      default: 0,
    },
    // timeStart: {
    //   type: String,
    // },
    // timeEnd: {
    //   type: String,
    // },
    status: {
      type: Boolean,
      default: false,
    },

    createdAt: {
      type: String,
      default: createdAt,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamp: true }
);

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
