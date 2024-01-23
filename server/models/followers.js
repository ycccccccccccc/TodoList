require('dotenv').config();
const { queryPromise } = require('../../util/db'); 

module.exports = {
    createFollower: async (user_id, task_id) => {
        try{
            const values = [user_id, task_id];
            const insertDataQuery = 'INSERT INTO followers (user_id, task_id) VALUES (?, ?)';
            const result = await queryPromise(insertDataQuery, values);
            return result.insertId;
        } catch (err) {
            console.error('Data inserted error', err);
            return false;
        }
    },
    followerCheck: async (user_id, task_id) => {
        try{
            const selectDataQuery = 'SELECT id FROM followers WHERE user_id = ? AND task_id = ?'
            const result = await queryPromise(selectDataQuery, [user_id, task_id]);
            return result;
        } catch(err){
            console.error('Check follower exist error')
            return false;
        }
    },
    deleteFollower: async (user_id, task_id) => {
        try{
            const deleteDataQuery = 'DELETE FROM followers WHERE user_id = ? AND task_id = ?';
            await queryPromise(deleteDataQuery, [user_id, task_id]);
            return true;
        } catch (err) {
            console.error('Delete follower error', err);
            return false;
        }
    }
}
