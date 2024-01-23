const tasksController = require('../controllers/tasks');
const auth = require('../../util/auth');
const express = require('express');
const router = express.Router();

router.post('/tasks', auth.auth, tasksController.createTask);
router.put('/tasks/:id', auth.auth, tasksController.updateTask);
router.get('/tasks', auth.auth, tasksController.getTasks);  
router.get('/tasks/search', auth.auth, tasksController.searchTasks);
router.delete('/tasks/:id', auth.auth, tasksController.deleteTask);

module.exports = router;
