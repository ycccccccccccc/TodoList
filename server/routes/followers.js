const followersController = require('../controllers/followers');
const auth = require('../../util/auth');
const express = require('express');
const router = express.Router();

router.post('/followers/:task_id', auth.auth, followersController.createFollower);
router.delete('/followers/:task_id', auth.auth, followersController.deleteFollower);  

module.exports = router;
