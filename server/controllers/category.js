const Category = require('../models/category');
const asyncHandler = require('../middlewares/asyncHandler');

exports.create = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.create({ name });

  res.status(200).json({
    success: true,
    data: category,
  });
});
