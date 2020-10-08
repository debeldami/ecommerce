const express = require('express');

const {
  createProduct,
  //   getProduct,
  //   deleteProduct,
  //   updateProduct,
} = require('../controllers/product');
const {
  requireSignIn,
  roleAuthorization,
} = require('../middlewares/authorization');

const router = express.Router();

router.post('/', requireSignIn, roleAuthorization(1), createProduct);

module.exports = router;
