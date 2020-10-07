const express = require('express');
const { userProfile } = require('../controllers/userProfile');
const { requireSignIn } = require('../middlewares/authorization');
const router = express.Router();

router.get('/:userId', requireSignIn, userProfile);

module.exports = router;
