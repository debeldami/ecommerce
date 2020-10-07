const User = require('../models/user');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc      get use profile
 * @route     get /api/secret/:userId
 * @access    Private
 */
exports.userProfile = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  console.log(userId);
  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorResponse('user does not exist', 400));
  }

  console.log(user);

  res.status(200).json({
    success: true,
    data: user,
  });
});
