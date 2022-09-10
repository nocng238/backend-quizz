const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 25,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: [true, 'Email Exist'],
    },
    phone: {
      type: String,
      trim: true,
      required: true,
      maxlength: 10,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      trim: true,
      default: 'active',
      maxlength: 25,
    },
    verified_date: {
      type: Date,
      default: null,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
    created_by: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
    update_by: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);
module.exports = User;
