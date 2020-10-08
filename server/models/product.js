const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'please enter a name'],
      maxlength: 32,
    },
    description: {
      type: String,
      required: [true, 'please enter a description'],
      maxlength: [2000, 'description cannot be more than 2000 character'],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, 'please enter a valid price'],
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      required: true,
      default: false,
      type: Boolean,
    },
    category: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
