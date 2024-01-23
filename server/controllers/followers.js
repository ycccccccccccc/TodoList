const followersModel = require('../models/followers');
const tasksController = require('../controllers/tasks');
const auth = require('../../util/auth');

module.exports = {
    createFollower: async (req, res) => {
        try {
            const tokenInfo = await auth.tokenInfo(req, res);
            const user_id = tokenInfo.id;
            const task_id = Number(req.params.task_id);
    
            if (!(user_id && task_id)) {
                return res.status(400).json({
                });
            }
            
            const checkResult  = await tasksController.checkTaskExist(task_id);
            if(!checkResult){
                return res.status(400).json({
                    message: 'Task not exist.',
                });
            }

            if (followCheck.length > 0) {
                return res.status(409).json({
                    message: 'Follower already exists!'
                });
            }
    
            const followerID = await followersModel.createFollower(user_id, task_id);
    
            if (followerID !== false) {
                if (!followerID) {
                    return res.status(500).json({
                        message: 'Failed to create follower',
                    });
                }
                res.status(200).json({
                    message: 'Create follower',
                    data: {
                        follower: {
                            id: followerID
                        }
                    }
                });
            } else {
                return res.status(400).json({
                    message: "Insert follower error.",
                });
            }
        } catch (err) {
            console.error(err);
            res.status(400).json({
                message: 'Create follower error.'
            });
        }
    },    
    deleteFollower: async (req, res) => {
        try {
            const tokenInfo = await auth.tokenInfo(req, res);
            const user_id = tokenInfo.id;
            const task_id = Number(req.params.task_id);
    
            if (!(user_id && task_id)) {
                return res.status(400).json({
                    message: "Incomplete follower's data!"
                });
            }
    
            const followerCheck = await followersModel.followerCheck(user_id, task_id);
    
            if (followerCheck.length === 0) {
                return res.status(404).json({
                    message: "You are not a follower!"
                });
            }
    
            const result = await followersModel.deleteFollower(user_id, task_id);
    
            if (result) {
                res.status(200).json({
                    message: 'Delete follower',
                    data: {
                        executor: {
                            id: followerCheck[0].id
                        }
                    }
                });
            } else {
                return res.status(500).json({
                    message: "Delete follower error!"
                });
            }
    
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Delete follower error.'
            });
        }
    }
}