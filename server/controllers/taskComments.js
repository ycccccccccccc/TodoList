const taskCommentsModel = require('../models/taskComments');
const tasksController = require('../controllers/tasks');
const auth = require('../../util/auth');

module.exports = {
    createTaskComment: async (req, res) => {
        try {
            const tokenInfo = await auth.tokenInfo(req, res);
            const user_id = tokenInfo.id;
            const task_id = Number(req.params.task_id);
            const comment = req.body.comment;

            if(!(user_id && task_id && comment)){
                return res.status(400).json({
                    message: "Incomplete task comment's data!"
                });
            }

            const checkResult  = await tasksController.checkTaskExist(task_id);
            if(!checkResult){
                return res.status(400).json({
                    message: 'Task not exist.',
                });
            }

            const taskCommentID = await taskCommentsModel.createTaskComment(user_id, task_id, comment);
            if(taskCommentID !== false){
                if (!taskCommentID) {
                    return res.status(500).json({
                        message: 'Failed to create task comment',
                    });
                }
                res.status(200).json({
                    message: 'Create task comment',
                    data: {
                        taskComment: {
                            id: taskCommentID
                        }
                    }
                });
            }
            else{
                return res.status(400).json({
                    message: "Insert task comment error.",
                });
            }
        } catch (err) {
            res.status(400).json({
                message: 'Create task comment erorr.'
            });
        }
    },
    getTaskComments: async (req, res) => {
        try{
            const task_id = Number(req.params.task_id);
            if(!task_id){
                return res.status(400).json({
                    message: "Task id is empty!"
                });
            }

            const results = await taskCommentsModel.getTaskComments(task_id);
            if(results !== false){
                let comments = []
                results.map((result) => {
                    comments.push({
                        id: result.id,
                        user: {
                            id: result.user_id,
                            name: result.name
                        },
                        comment: result.comment,
                        created_at: result.created_at,
                    })
                });                
                res.status(200).json({
                    message: 'Get task comments',
                    data: {
                        taskComments: comments
                    }
                });
            }
            else{
                res.status(500).json({
                    message: 'Get task comments erorr.'
                });
            }

        } catch(err) {
            res.status(400).json({
                message: 'Get task comments erorr.'
            });
        }
    }
}