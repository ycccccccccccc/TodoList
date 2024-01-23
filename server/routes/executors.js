const executorsController = require('../controllers/executors');
const auth = require('../../util/auth');
const express = require('express');
const router = express.Router();

router.post('/executors/:task_id', auth.auth, executorsController.createExecutor);
router.delete('/executors/:task_id', auth.auth, executorsController.deleteExecutor);

module.exports = router;
