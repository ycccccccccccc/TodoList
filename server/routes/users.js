const usersController = require('../controllers/users');
const express = require('express');
const router = express.Router();

router.post('/users/signup', usersController.signup);
router.post('/users/signin', usersController.singin);

module.exports = router;
