const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const mongoosePaginate = require('mongoose-paginate-v2');

const Cv = require('../cv/cv.model');

const offerSchema = new mongoose.Schema(
  {
    cv: { type: mongoose.Types.ObjectId, ref: Cv },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      required: true,
      default: null,
    },
    status: {
      type: String,
      default: 'new',
    },
    startDate: {
      type: Date,
      required: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

offerSchema.plugin(mongoosePaginate);
offerSchema.plugin(mongooseDelete);

const offer = mongoose.model('Offer', offerSchema);

module.exports = offer;
