require('dotenv').config();
const { queryPromise } = require('../../util/db'); 

module.exports = {
    createTaskComment: async (user_id, task_id, comment) => {
        try{
            const values = [user_id, task_id, comment];
            const insertDataQuery = 'INSERT INTO task_comments (user_id, task_id, comment) VALUES (?, ?, ?)';
            const result = await queryPromise(insertDataQuery, values);
            return result.insertId;
        } catch (err) {
            console.error('Data inserted error', err);
            return false;
        }
    },
    getTaskComments: async (task_id) => {
        try {
            const selectDataQuery = 'SELECT task_comments.id, task_comments.user_id, task_comments.comment, DATE_FORMAT(task_comments.created_at, "%Y-%m-%d %H:%i:%s") AS created_at, users.name \
                FROM task_comments LEFT JOIN users ON task_comments.user_id = users.id \
                WHERE task_id = ?';
            const result = await queryPromise(selectDataQuery, [task_id]);
            return result;
        } catch (err) {
            console.error('Get user from mail error');
            return false;
        }
    }
    
}
