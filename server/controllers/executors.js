const executorsModel = require('../models/executors');
const tasksController = require('../controllers/tasks');
const auth = require('../../util/auth');

module.exports = {
    createExecutor: async (req, res) => {
        try {
            const tokenInfo = await auth.tokenInfo(req, res);
            const user_id = tokenInfo.id;
            const task_id = Number(req.params.task_id);

            if(!(user_id && task_id)){
                return res.status(400).json({
                    message: "Incomplete executor's data!"
                });
            }

            const checkResult  = await tasksController.checkTaskExist(task_id);
            if(!checkResult){
                return res.status(400).json({
                    message: 'Task not exist.',
                });
            }

            const executorCheck = await executorsModel.executorCheck(user_id, task_id);
            if(executorCheck.length > 0){
                return res.status(400).json({
                    message: 'Executor exist!'
                })
            }

            const executorID = await executorsModel.createExecutor(user_id, task_id);
            if(executorID !== false){
                if (!executorID) {
                    return res.status(500).json({
                        message: 'Failed to create executor',
                    });
                }
                res.status(200).json({
                    message: 'Create executor',
                    data: {
                        executor: {
                            id: executorID
                        }
                    }
                });
            }
            else{
                return res.status(400).json({
                    message: "Insert executor error.",
                });
            }
        } catch (err) {
            res.status(400).json({
                message: 'Create executor erorr.'
            });
        }
    },
    deleteExecutor: async (req, res) => {
        try {
            const tokenInfo = await auth.tokenInfo(req, res);
            const user_id = tokenInfo.id;
            const task_id = Number(req.params.task_id);
    
            if (!(user_id && task_id)) {
                return res.status(400).json({
                    message: "Incomplete executor's data!"
                });
            }
    
            const executorCheck = await executorsModel.executorCheck(user_id, task_id);
            if (executorCheck.length === 0) {
                return res.status(400).json({
                    message: "You are not executor!"
                });
            }
            
            const result = await executorsModel.deleteExecutor(user_id, task_id);
    
            if (result) {
                res.status(200).json({
                    message: 'Delete executor',
                    data: {
                        executor: {
                            id: executorCheck[0]['id']
                        }
                    }
                });
            } else {
                return res.status(500).json({
                    message: "Delete executor error!"
                });
            }
    
        } catch (err) {
            console.error(err);
            res.status(400).json({
                message: 'Delete executor error.'
            });
        }
    },    
}