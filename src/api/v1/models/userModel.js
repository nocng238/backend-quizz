const moment = require('moment');
const mongoose = require('mongoose');

const createdAt = moment().format();

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      enum: ['Nam', 'Nữ', 'Bê Đê'],
    },
    role: {
      type: Number,
      default: 0,
    }, //  0 = admin , 1 = teacher,2=student
    className: {
      type: String,
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/dfxk0fqfp/image/upload/v1626342034/watchshopstorage/default-avatar-profile-icon-vector-social-media-user-portrait-176256935_qy5m6a.jpg',
    },
    createdAt: {
      type: String,
      default: createdAt,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
