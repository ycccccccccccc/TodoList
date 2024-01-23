const subtasksController = require('../controllers/subtasks');
const auth = require('../../util/auth');
const express = require('express');
const router = express.Router();

router.post('/subtasks/:task_id', auth.auth, subtasksController.createSubtask);
router.get('/subtasks/:id', auth.auth, subtasksController.getSubtask);
// router.get('/subtasks/:task_id', auth.auth, subtasksController.getSubtasks);
router.put('/subtasks/:id', auth.auth, subtasksController.updateSubtask);

module.exports = router;
