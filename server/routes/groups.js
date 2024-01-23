const groupsController = require('../controllers/groups');
const auth = require('../../util/auth');
const express = require('express');
const router = express.Router();

router.post('/groups', auth.auth, groupsController.createGroup);
router.post('/groups/:id/followers/:task_id', auth.auth, groupsController.createFollowers);
router.post('/groups/:id/executors/:task_id', auth.auth, groupsController.createExecutors);

module.exports = router;