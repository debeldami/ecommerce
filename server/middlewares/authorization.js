const asyncHandler = require('./asyncHandler');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/user');

exports.requireSignIn = asyncHandler(async (req, res, next) => {
  let token;

  //check if token exists
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  //make sure token exist
  if (!token) {
    return next(new ErrorResponse('not authorized to access this route', 401));
  }

  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    return next(new ErrorResponse('not authorized to access this route', 401));
  }
});

//Grant access to specific roles
exports.roleAuthorization = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(
      new ErrorResponse(
        `${req.user.role} role not authorized to access this route`,
        403
      )
    );
  }
  next();
};
