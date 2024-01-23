const tasksModel = require('../models/tasks');
const auth = require('../../util/auth');

module.exports = {
    createTask: async (req, res) => {
        try {
            const tokenInfo = await auth.tokenInfo(req, res);
            const user_id = tokenInfo.id;
            const content = req.body.content;
            const expired_at = req.body.expired_at;
            const state = req.body.state;
            const next_time = req.body.next_time;
            const repeat_period = req.body.repeat_period;

            if(!(user_id && content && state && repeat_period)){
                return res.status(400).json({
                    message: "Incomplete task's data!"
                });
            }

            const taskID = await tasksModel.createTask(user_id, content, state, expired_at, repeat_period, next_time);
            if(taskID !== false){
                if (!taskID) {
                    return res.status(500).json({
                        message: 'Failed to create task',
                    });
                }
                res.status(200).json({
                    message: 'Create task',
                    data: {
                        task: {
                            id: taskID
                        },
                    },
                });
            }
            else{
                return res.status(400).json({
                    message: "Insert error.",
                });
            }
        } catch (err) {
            res.status(400).json({
                message: 'Create task erorr.'
            });
        }
    },
    getTasks: async (req, res) => {
        try {
            const tokenInfo = await auth.tokenInfo(req, res);
            const user_id = tokenInfo.id;

            const tasks = await tasksModel.getTasks(user_id);
            if(tasks !== false){

                res.status(200).json({
                    message: 'Get tasks',
                    data: {
                        tasks: tasks
                    },
                });
            }
            else{
                return res.status(400).json({
                    message: "Get tasks error.",
                });
            }
        } catch (err) {
            res.status(400).json({
                message: 'Get tasks erorr.'
            });
        }
    },
    searchTasks: async (req, res) => {
        try {
            const creator_id = parseInt(req.query.creator_id);
            const executor_id = parseInt(req.query.executor_id);
            const start_time = req.query.start_time;
            const end_time = req.query.end_time;
            const sort =  req.query.sort;

            if (!isNaN(executor_id)) {
                let sortOrder = '';
                if (sort === 'created_time') {
                    sortOrder = 'ORDER BY tasks.created_at DESC';
                } else if (sort === 'expired_time') {
                    sortOrder = 'ORDER BY tasks.expired_at ASC';
                } else if (sort === 'creator') {
                    sortOrder = 'ORDER BY tasks.user_id ASC';
                } else if (sort === 'ID') {
                    sortOrder = 'ORDER BY tasks.id DESC';
                }
        
                let filterOrder = `WHERE executors.user_id = ${executor_id}`;
                const datetimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
                if (!isNaN(creator_id)) {
                    filterOrder = `AND tasks.user_id = ${creator_id}`;
                }
                if (datetimeRegex.test(start_time)) {
                    filterOrder += ` AND tasks.expired_at > '${start_time}'` ;
                }
                if (datetimeRegex.test(end_time)) {
                    filterOrder += ` AND tasks.expired_at < '${end_time}'` ;
                }
        
                const tasks = await tasksModel.getSearchTasksWithExecutors(filterOrder, sortOrder);
                if (tasks !== false) {
                    res.status(200).json({
                        message: 'Search tasks',
                        data: {
                            tasks: tasks
                        },
                    });
                } else {
                    res.status(500).json({
                        message: "Search tasks error.",
                    });
                }
            }
            else{
                let sortOrder = '';
                if (sort === 'created_time') {
                    sortOrder = 'ORDER BY created_at DESC';
                } else if (sort === 'expired_time') {
                    sortOrder = 'ORDER BY expired_at ASC';
                } else if (sort === 'creator') {
                    sortOrder = 'ORDER BY user_id ASC';
                } else if (sort === 'ID') {
                    sortOrder = 'ORDER BY id DESC';
                }
        
                let filterOrder = '';
                const datetimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
                if (!isNaN(creator_id)) {
                    filterOrder = `WHERE user_id = ${creator_id}`;
                }
                if (datetimeRegex.test(start_time)) {
                    filterOrder += filterOrder.length > 0 ? ` AND expired_at > '${start_time}'` : `WHERE expired_at > '${start_time}'`;
                }
                if (datetimeRegex.test(end_time)) {
                    filterOrder += filterOrder.length > 0 ? ` AND expired_at < '${end_time}'` : `WHERE expired_at < '${end_time}'`;
                }
        
                const tasks = await tasksModel.getSearchTasks(filterOrder, sortOrder);
                if (tasks !== false) {
                    res.status(200).json({
                        message: 'Search tasks',
                        data: {
                            tasks: tasks
                        },
                    });
                } else {
                    res.status(500).json({
                        message: "Search tasks error.",
                    });
                }
            }
    
            
        } catch (err) {
            res.status(500).json({
                message: 'Search tasks error.',
            });
        }
    },    
    updateTask: async (req, res) => {
        try{
            const tokenInfo = await auth.tokenInfo(req, res);
            const user_id = tokenInfo.id;
            const task_id = Number(req.params.id);
            const content = req.body.content;
            const state = req.body.state;
            const expired_at = req.body.expired_at;
            const repeat_period = req.body.repeat_period;
            const next_time = req.body.next_time;

            const taskInfo = await tasksModel.getTask(task_id);
            if(taskInfo !== false){
                if(taskInfo.length == 0){
                    return res.status(404).json({
                        message: 'Task not exist!'
                    });
                }
                if(taskInfo[0].user_id !== user_id){
                    return res.status(400).json({
                        message: 'You are not creator!'
                    });
                }
            }
            else{
                return res.status(500).json({
                    message: "Check task exist error.",
                });
            }

            const result = await tasksModel.updateTask(task_id, user_id, content, state, expired_at, repeat_period, next_time);
            if(result){
                return res.status(200).json({
                    message: 'Update task',
                    data: {
                        tasks: {
                            id: task_id
                        }
                    },
                });
            }
            else{
                return res.status(400).json({
                    message: "Update task error.",
                });
            }

        } catch(err){
            res.status(400).json({
                message: 'Update task erorr.'
            });
        }
    },
    deleteTask: async (req, res) => {
        try{
            const tokenInfo = await auth.tokenInfo(req, res);
            const user_id = tokenInfo.id;
            const task_id = Number(req.params.id);

            const taskInfo = await tasksModel.getTask(task_id);
            if(taskInfo !== false){
                if(taskInfo.length == 0){
                    return res.status(404).json({
                        message: 'Task not exist!'
                    });
                }
                if(taskInfo[0].user_id !== user_id){
                    return res.status(400).json({
                        message: 'You are not creator!'
                    });
                }
            }
            else{
                return res.status(500).json({
                    message: "Check task exist error.",
                });
            }

            const result = await tasksModel.deleteTask(user_id, task_id);
            if(result){
                return res.status(200).json({
                    message: 'Delete tasks',
                    data: {
                        tasks: {
                            id: task_id
                        }
                    },
                });
            }
            else{
                res.status(500).json({
                    message: 'Delete task erorr.'
                });
            }

        } catch(err){
            res.status(400).json({
                message: 'Delete task erorr.'
            });
        }
    },
    checkTaskExist: async (task_id) => {
        try{
            const checkExist = await tasksModel.getTask(task_id);
            if (checkExist !== false) {
                if (checkExist.length === 0) {
                    return false;
                }else{
                    return true;
                }
            } else {
                return false;
            }
        } catch(err) {
            return false;
        }
    }
}