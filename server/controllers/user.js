const User = require('../models/user');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc      Sign up
 * @route     POST /api/signup
 * @access    Public
 */
exports.signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  sendTokenResponse(user, 200, res);
});

/**
 * @desc      Sign in
 * @route     POST /api/signin
 * @access    Public
 */
exports.signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const validateEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  //validate email and password
  if (!email || !password || !validateEmail.test(email)) {
    return next(
      new ErrorResponse('please provide a valid email and password', 401)
    );
  }

  //check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('invalid credentials', 401));
  }

  const isMatched = await user.matchPassword(password);

  if (!isMatched) {
    return next(new ErrorResponse('invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

//get token, create cookies and send response
const sendTokenResponse = (user, stausCode, res) => {
  const { name, _id, role } = user;

  //create token from static method created in user model
  const token = user.getSignedJwtToken();

  //expires for expire date
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(stausCode)
    .cookie('token', token, options)
    .json({ success: true, user: { name, _id, role } });
};
