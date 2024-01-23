require('dotenv').config();
const { queryPromise } = require('../../util/db'); 

module.exports = {
    createTask: async (user_id, content, state, expired_at, repeat_period, next_time) => {
        try{
            const values = [user_id, content, state, expired_at, repeat_period, next_time];
            const insertDataQuery = 'INSERT INTO tasks (user_id, content, state, expired_at, repeat_period, next_time) VALUES (?, ?, ?, ?, ?, ?)';
            const result = await queryPromise(insertDataQuery, values);
            return result.insertId;
        } catch (err) {
            console.error('Data inserted error', err);
            return false;
        }
    },
    getTask: async (task_id) => {
        try {
            const selectDataQuery = 'SELECT id, user_id, content, state, created_at, expired_at, repeat_period, next_time FROM tasks WHERE id = ?';
            const result = await queryPromise(selectDataQuery, [task_id]);
            return result;
        } catch (err) {
            console.error('Get task from id error', err);
            return false;
        }
    },
    getTasks: async (user_id) => {
        try {
            const selectDataQuery = 'SELECT DISTINCT tasks.id, tasks.user_id, tasks.content, tasks.state, DATE_FORMAT(tasks.created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(tasks.expired_at, "%Y-%m-%d %H:%i:%s") AS expired_at, tasks.repeat_period, tasks.next_time\
                FROM tasks\
                LEFT JOIN followers ON tasks.id = followers.task_id AND followers.user_id = ?\
                LEFT JOIN executors ON tasks.id = executors.task_id AND executors.user_id = ?\
                WHERE tasks.user_id = ? OR followers.user_id IS NOT NULL OR executors.user_id IS NOT NULL;';
            const result = await queryPromise(selectDataQuery, [user_id, user_id, user_id]);
            return result;
        } catch (err) {
            console.error('Get task from id error', err);
            return false;
        }
    },
    getSearchTasks: async (filterOrder, sortOrder) => {
        try {
            const selectDataQuery = `SELECT DISTINCT id, user_id, content, state, DATE_FORMAT(created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(expired_at, "%Y-%m-%d %H:%i:%s") AS expired_at, repeat_period, next_time\
                FROM tasks ${filterOrder} ${sortOrder};`;
            const result = await queryPromise(selectDataQuery, []);
            return result;
        } catch (err) {
            console.error('Get task from id error', err);
            return false;
        }
    },
    getSearchTasksWithExecutors: async (filterOrder, sortOrder) => {
        try {
            const selectDataQuery = `SELECT DISTINCT tasks.id, tasks.user_id, tasks.content, tasks.state, DATE_FORMAT(tasks.created_at, "%Y-%m-%d %H:%i:%s") AS created_at, DATE_FORMAT(tasks.expired_at, "%Y-%m-%d %H:%i:%s") AS expired_at, tasks.repeat_period, tasks.next_time, executors.user_id AS executor_id \
            FROM tasks LEFT JOIN executors ON tasks.id = executors.task_id \
            ${filterOrder} ${sortOrder};`;
            const result = await queryPromise(selectDataQuery);
            return result;
        } catch (err) {
            console.error('Get task from id error', err);
            return false;
        }
    },
    updateTask: async(task_id, user_id, content, state, expired_at, repeat_period, next_time) => {
        try{
            const updateDataQuery = 'UPDATE tasks SET user_id = ?, content = ?, state = ?, expired_at = ?, repeat_period = ?, next_time = ? WHERE id = ?;';
            await queryPromise(updateDataQuery, [user_id, content, state, expired_at, repeat_period, next_time, task_id]);
            return true;
        } catch (err) {
            console.error('Update error', err);
            return false;
        }
    },
    updateTaskState: async(state, task_id) => {
        try{
            const updateDataQuery = 'UPDATE tasks SET state = ? WHERE id = ?;';
            await queryPromise(updateDataQuery, [state, task_id]);
            return true;
        } catch (err) {
            console.error('Update error', err);
            return false;
        }
    },
    deleteTask: async(user_id, task_id) => {
        try{
            const deleteDataQuery = 'DELETE FROM tasks WHERE user_id = ? AND id = ?';
            await queryPromise(deleteDataQuery, [user_id, task_id]);
            return true;
        } catch (err) {
            console.error('Delete follower error', err);
            return false;
        }
    },   
}
