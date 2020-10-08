const mongoose = require('mongoose');
const errorResponse = require('../utils/errorResponse');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'please enter a name'],
      maxlength: 32,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);
