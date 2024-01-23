const subtasksModel = require('../models/subtasks');
const tasksController = require('../controllers/tasks');
const tasksModel = require('../models/tasks')
const auth = require('../../util/auth');

module.exports = {
    createSubtask: async (req, res) => {
        try {
            const tokenInfo = await auth.tokenInfo(req, res);
            const user_id = tokenInfo.id;
            const task_id = Number(req.params.task_id);
            const content = req.body.content;
            const expired_at = req.body.expired_at;
            const state = req.body.state;
            const next_time = req.body.next_time;
            const repeat_period = req.body.repeat_period;

            if(!(user_id && task_id && content && state && repeat_period)){
                return res.status(400).json({ message: "Incomplete subtask's data!" });
            }

            const checkResult  = await tasksController.checkTaskExist(task_id);
            if(!checkResult){
                return res.status(400).json({ message: 'Task not exist.' });
            }

            const updateTaskState = await tasksModel.updateTaskState('ongoing', task_id);
            if(!updateTaskState) return res.status(500).json({ message: 'Update task error.' });

            const subtaskID = await subtasksModel.createSubtask(user_id, task_id, content, state, expired_at, repeat_period, next_time);
            if(subtaskID !== false){
                if (!subtaskID) {
                    return res.status(500).json({ message: 'Failed to create subtask' });
                }
                res.status(200).json({
                    message: 'Create subtask',
                    data: {
                        subtask: {
                            id: subtaskID
                        }
                    }
                });
            }
            else{
                return res.status(400).json({ message: "Insert subtask error." });
            }
        } catch (err) {
            return res.status(400).json({ message: 'Create subtask erorr.' });
        }
    },
    getSubtasks: async (req, res) => {
        try {
            const task_id = Number(req.params.task_id);
            
            if(!(task_id)){
                return res.status(400).json({ message: "No task ID!" });
            }

            const check = await tasksController.checkTaskExist(task_id);
            if(!check) return res.status(400).json({ message: 'Task not exist.' });

            const subtasks = await subtasksModel.getSubtasks(task_id);
            if(subtasks !== false){
                res.status(200).json({
                    message: 'Get subtasks',
                    data: {
                        subtasks: subtasks
                    }
                });
            }
            else{
                return res.status(400).json({ message: "Get subtask error." });
            }
        } catch (err) {
            res.status(400).json({ message: 'Get subtask erorr.' });
        }
    },
    getSubtask: async (req, res) => {
        try {
            const subtask_id = Number(req.params.id);
            
            if(!(subtask_id))   return res.status(400).json({ message: "No subtask ID!" });

            const subtask = await subtasksModel.getSubtask(subtask_id);
            if(subtask !== false){
                if(subtask.length !== 0){
                    res.status(200).json({
                        message: 'Get subtasks',
                        data: {
                            subtask: subtask
                        }
                    });
                }
                else{
                    return res.status(404).json({ message: "Subtask not exist." });
                }
            }
            else{
                return res.status(400).json({ message: "Get subtask error." });
            }
        } catch (err) {
            return res.status(400).json({ message: 'Get subtask erorr.' });
        }
    },
    updateSubtask: async (req, res) => {
        try {
            const subtask_id = Number(req.params.id);
            const task_id = req.body.task_id;
            const content = req.body.content;
            const expired_at = req.body.expired_at;
            const state = req.body.state;
            const next_time = req.body.next_time;
            const repeat_period = req.body.repeat_period;

            if(!( subtask_id && task_id && content && state && repeat_period)){
                return res.status(400).json({ message: "Incomplete subtask's data!" });
            }

            const check = await subtasksModel.getSubtask(subtask_id);
            if(check.length === 0) return res.status(400).json({ message: "Subtask not exist." });
            
            const result = await subtasksModel.updateSubtask(subtask_id, task_id, content, state, expired_at, repeat_period);
            if(state === 'done'){
                const checkState = await subtasksModel.getSubtaskState(task_id);
                let updateTask = true;
                for(const state of checkState){
                    if(state['state'] !== 'done'){
                        updateTask = false;
                        break;
                    }
                }
                if(updateTask){
                    const updateTask = await tasksModel.updateTaskState('done', task_id);
                    if(!updateTask) return res.status(500).json({ message: "Update task state error!" });
                }
            }
            if(result){
                return res.status(200).json({
                    message: 'Update subtask',
                    data: {
                        subtask: {
                            id: subtask_id,
                            task_id: task_id, 
                            content: content, 
                            state: state, 
                            expired_at: expired_at, 
                            repeat_period: repeat_period, 
                            next_time: next_time
                        }
                    }
                })
            }
            else{
                return res.status(400).json({ message: 'Update subtask error!' });
            } 
        } catch (err) {
            res.status(400).json({ message: 'Update subtask erorr.' });
        }
    }
}