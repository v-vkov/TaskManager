const router = require('express').Router();

const {user} = require('../controllers');

router.post('/register',  user.createUser);
router.post('/auth',  user.userAuth);

module.exports = router;
