import moment from 'moment';
import mongoose from 'mongoose';
const User = require('./userModel');
const createdAt = moment().format();

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  students: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

const Class = mongoose.model('Class', classSchema);

export default Class;
