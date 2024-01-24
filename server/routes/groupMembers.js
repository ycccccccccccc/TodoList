const groupMembersController = require('../controllers/group_members');
const auth = require('../../util/auth');
const express = require('express');
const router = express.Router();


router.post('/groupmembers/:group_id', auth.auth, groupMembersController.createGroupMember);

module.exports = router;
