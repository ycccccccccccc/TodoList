require('dotenv').config();
const { queryPromise } = require('../../util/db'); 

module.exports = {
    createGroup: async (user_id, name) => {
        try{
            const values = [user_id, name];
            const insertDataQuery = 'INSERT INTO groups_table (user_id, name) VALUES (?, ?)';
            const result = await queryPromise(insertDataQuery, values);
            return result.insertId;
        } catch (err) {
            console.error('Data inserted error', err);
            return false;
        }
    },
    // getUserfromMail: async (email) => {
    //     try{
    //         const selectDataQuery = 'SELECT id, name, password FROM users WHERE email = ?'
    //         const result = await queryPromise(selectDataQuery, [email]);
    //         return result;
    //     } catch(err){
    //         console.error('Get user from mail error')
    //         return false;
    //     }
    // }
}
