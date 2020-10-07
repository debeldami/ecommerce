const express = require('express');
const { signup, signin, signout } = require('../controllers/auth');
const { requireSignIn } = require('../middlewares/authorization');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.get('/hello', requireSignIn, (req, res) => {
  console.log('4');
  res.json({
    tes: 'okay',
  });
});

module.exports = router;
