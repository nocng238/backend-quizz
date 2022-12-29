const moment = require('moment');
const mongoose = require('mongoose');
const createdAt = moment().format();

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  students: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  createdAt: {
    type: String,
    default: createdAt,
  },
  disable: {
    type: Boolean,
    default: false,
  },
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
