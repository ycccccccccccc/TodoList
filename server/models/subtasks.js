require('dotenv').config();
const { queryPromise } = require('../../util/db'); 

module.exports = {
    createSubtask: async (user_id, task_id, content, state, expired_at, repeat_period, next_time) => {
        try{
            const values = [user_id, task_id, content, state, expired_at, repeat_period, next_time];
            const insertDataQuery = 'INSERT INTO subtasks (user_id, task_id, content, state, expired_at, repeat_period, next_time) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const result = await queryPromise(insertDataQuery, values);
            return result.insertId;
        } catch (err) {
            console.error('Data inserted error', err);
            return false;
        }
    },
    updateSubtask: async(subtask_id, task_id, content, state, expired_at, repeat_period, next_time) => {
        try{
            const updateDataQuery = 'UPDATE subtasks SET task_id = ?, content = ?, state = ?, expired_at = ?, repeat_period = ?, next_time = ? WHERE id = ?;';
            await queryPromise(updateDataQuery, [task_id, content, state, expired_at, repeat_period, next_time, subtask_id]);
            return true;
        } catch (err) {
            console.error('Update error', err);
            return false;
        }
    },
    getSubtask: async(subtask_id) => {
        try {
            const selectDataQuery = 'SELECT id, user_id, task_id, content, state, DATE_FORMAT(expired_at, "%Y-%m-%d %H:%i:%s") AS expired_at, DATE_FORMAT(created_at, "%Y-%m-%d %H:%i:%s") AS created_at, repeat_period, DATE_FORMAT(next_time, "%Y-%m-%d %H:%i:%s") AS next_time FROM subtasks WHERE id = ?';
            const result = await queryPromise(selectDataQuery, [subtask_id]);
            return result;
        } catch (err) {
            console.error('Get task from id error', err);
            return false;
        }
    },
    getSubtasks: async(task_id) => {
        try {
            const selectDataQuery = 'SELECT id, user_id, task_id, content, state, expired_at, repeat_period, next_time FROM subtasks WHERE task_id = ?';
            const result = await queryPromise(selectDataQuery, [task_id]);
            return result;
        } catch (err) {
            console.error('Get task from task id error', err);
            return false;
        }
    },
    getSubtaskState: async(task_id) => {
        try {
            const selectDataQuery = 'SELECT state FROM subtasks WHERE task_id = ?';
            const result = await queryPromise(selectDataQuery, [task_id]);
            return result;
        } catch (err) {
            console.error('Get task state from task id error', err);
            return false;
        }
    }
}
