const Category = require('../models/category');
const asyncHandler = require('../middlewares/asyncHandler');

/**
 * @desc      create product category
 * @route     post /api/category/
 * @access    Private
 */
exports.create = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  const category = await Category.create({ name });

  res.status(200).json({
    success: true,
    data: category,
  });
});
