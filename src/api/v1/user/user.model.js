const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    maxlength: 25,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  phone: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "active",
  },
  virified_date: {
    type: Date,
    default: null,
  },
  created_by: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  update_by:
  {
    type: mongoose.Types.ObjectId,
    ref: "user"
  }
  ,
  delete_at:
  {
    type: Date,
    default: null,
  }
  ,
},
  { timestamps: true }
);

const User = mongoose.model('user', userSchema);
module.exports = User;
