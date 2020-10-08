const User = require('../models/user');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc      get use profile
 * @route     get /api/user/
 * @access    Private
 */
exports.userProfile = asyncHandler(async (req, res) => {
  const userId = req.user;

  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorResponse('user does not exist', 400));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});
