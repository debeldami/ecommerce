const express = require('express');
const { create } = require('../controllers/category');
const {
  requireSignIn,
  roleAuthorization,
} = require('../middlewares/authorization');

const router = express.Router();

router.post('/create', requireSignIn, roleAuthorization(2), create);

module.exports = router;
