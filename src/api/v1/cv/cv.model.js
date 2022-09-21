const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 25,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
      maxLength: 10,
    },
    campaign: {
      type: mongoose.Types.ObjectId,
      ref: 'Campaign',
    },
    link: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'active',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    updateBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Cv = mongoose.model('Cv', cvSchema);
module.exports = Cv;
