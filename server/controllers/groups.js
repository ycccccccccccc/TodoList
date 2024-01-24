const groupsModel = require('../models/groups');
const groupMembersModel = require('../models/groupMembers');
const followersModel = require('../models/followers');
const executorsModel = require('../models/executors');
const tasksController = require('../controllers/tasks');

const auth = require('../../util/auth');

module.exports = {
    createGroup: async (req, res) => {
        try {
            const tokenInfo = await auth.tokenInfo(req, res);
            const user_id = tokenInfo.id;
            const groupName = req.body.name;

            if(!(user_id && groupName)){
                return res.status(400).json({
                    message: "Incomplete group's data!"
                });
            }

            const groupID = await groupsModel.createGroup(user_id, groupName);
            if(groupID !== false){
                const asLeader = await groupMembersModel.createGroupMenber(user_id, groupID, 'leader');
                if(asLeader !== false){
                    if (!groupID) {
                        return res.status(500).json({
                            message: 'Failed to create group',
                        });
                    }
                    res.status(200).json({
                        message: 'Create group',
                        data: {
                            group: {
                                id: groupID
                            }
                        }
                    });
                }
                else{
                    return res.status(400).json({
                        message: "Insert group member error.",
                    });
                }
            }
            else{
                return res.status(400).json({
                    message: "Insert group error.",
                });
            }
        } catch (err) {
            res.status(400).json({
                message: 'Create group erorr.'
            });
        }
    },
    createFollowers: async (req, res) => {
        try {
            const tokenInfo = await auth.tokenInfo(req, res);
            const user_id = tokenInfo.id;
            const group_id = Number(req.params.id);
            const task_id = Number(req.params.task_id);

            if(!(user_id && group_id)){
                return res.status(400).json({
                    message: "Incomplete group's data!"
                });
            }

            const checkResult  = await tasksController.checkTaskExist(task_id);
            if(!checkResult){
                return res.status(400).json({
                    message: 'Task not exist.',
                });
            }

            const identity = await groupMembersModel.getGroupMember(user_id, group_id);
            if(identity !== false){
                if(identity.length == 0){
                    return res.status(400).json({
                        message: "You are not in the group!"
                    });
                }
                if(identity[0]['identity'] !== 'leader'){
                    return res.status(400).json({
                        message: "You are not group leader!"
                    });
                }
            }
            else{
                res.status(500).json({
                    message: 'Create group follwers erorr.'
                });
            }

            const members = await groupMembersModel.getGroupMembers(group_id);
            const result = [];
            for(const member of members){
                const check = await followersModel.followerCheck(member['user_id'], task_id);
                if (check !== false) {
                    if (check.length == 0) {
                        const followerID = await followersModel.createFollower(member['user_id'], task_id);
                        if (followerID !== false) {
                            if (followerID) {
                                result.push({
                                    'id': followerID,
                                    'user_id': member['user_id']
                                });
                            }
                        } else {
                            return res.status(400).json({
                                message: 'Create group follower erorr.'
                            });
                        }
                    }
                } else {
                    return res.status(400).json({
                        message: 'Check follwers erorr.'
                    });
                }
            }
    
            res.status(200).json({
                message: 'Create group followers',
                data: {
                    followers: result
                }
            });
            

        } catch (err) {
            res.status(400).json({
                message: 'Create group follwers erorr.'
            });
        } 
    },
    createExecutors: async (req, res) => {
        try {
            const tokenInfo = await auth.tokenInfo(req, res);
            const user_id = tokenInfo.id;
            const group_id = Number(req.params.id);
            const task_id = Number(req.params.task_id);

            if(!(user_id && group_id)){
                return res.status(400).json({
                    message: "Incomplete group's data!"
                });
            }

            const checkResult  = await tasksController.checkTaskExist(task_id);
            if(!checkResult){
                return res.status(400).json({
                    message: 'Task not exist.',
                });
            }

            const identity = await groupMembersModel.getGroupMember(user_id, group_id);
            if(identity !== false){
                if(identity.length == 0){
                    return res.status(400).json({
                        message: "You are not in the group!"
                    });
                }
                if(identity[0]['identity'] !== 'leader'){
                    return res.status(400).json({
                        message: "You are not group leader!"
                    });
                }
            }
            else{
                res.status(500).json({
                    message: 'Create group follwers erorr.'
                });
            }

            const members = await groupMembersModel.getGroupMembers(group_id);
            const result = [];
            for(const member of members){
                const check = await executorsModel.executorCheck(member['user_id'], task_id);
                if (check !== false) {

                    if (check.length == 0) {
                        const executorID = await executorsModel.createExecutor(member['user_id'], task_id);
                        if (executorID !== false) {
                            if (executorID) {
                                result.push({
                                    'id': executorID,
                                    'user_id': member['user_id']
                                });
                            }
                        } else {
                            return res.status(400).json({
                                message: 'Create group executors erorr.'
                            });
                        }
                    }
                } else {
                    return res.status(400).json({
                        message: 'Check executors erorr.'
                    });
                }
            }
    
            res.status(200).json({
                message: 'Create group executors',
                data: {
                    executors: result
                }
            });
            

        } catch (err) {
            res.status(400).json({
                message: 'Create group executors erorr.'
            });
        } 
    }
}