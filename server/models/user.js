const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorResponse = require('../utils/errorResponse');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'please enter a name'],
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      unique: [true, 'email already exist'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },

    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

//password encryption
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  console.log(this.password.length);
  if (this.password.length < 6) {
    return next(new errorResponse('password to short', 400));
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

//match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
