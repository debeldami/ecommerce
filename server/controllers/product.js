const Product = require('../models/product');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc      create product
 * @route     Post /api/product/
 * @access    Private
 */
exports.createProduct = asyncHandler(async (req, res, next) => {
  const user = req.user._id;

  // check for all fields
  const { name, description, price, category, quantity, shipping } = req.body;

  //   check if all fields plus image uploaded
  if (!req.files) {
    return next(new ErrorResponse(`please upload an image`, 400));
  }

  //get image data
  const file = req.files.image;

  //check if more than one file is named image
  if (Array.isArray(file)) {
    return next(new ErrorResponse(`please upload a single image`, 400));
  }

  //make sure file uploaded is an image
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`file must be an image`, 400));
  }

  //check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `please upload an image less than ${process.env.MAX_FILE_UPLOAD} bytes`,
        400
      )
    );
  }

  const product = await Product.create({
    name,
    description,
    price,
    category,
    quantity,
    shipping,
    user,
    photo: {
      data: file.data,
      contentType: file.mimetype,
    },
  });

  res.json({
    success: true,
    data: product,
  });
});

// exports.getProduct = asyncHandler(async (req, res) => {});

// exports.deleteProduct = asyncHandler(async (req, res) => {});

// exports.updateProducts = asyncHandler(async (req, res) => {});
