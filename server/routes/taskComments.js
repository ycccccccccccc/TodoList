const taskCommentsController = require('../controllers/taskComments');
const auth = require('../../util/auth');
const express = require('express');
const router = express.Router();

router.post('/taskComments/:task_id', auth.auth, taskCommentsController.createTaskComment);
router.get('/taskComments/:task_id', auth.auth, taskCommentsController.getTaskComments);

module.exports = router;
