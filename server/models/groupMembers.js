require('dotenv').config();
const { queryPromise } = require('../../util/db'); 

module.exports = {
    createGroupMenber: async (user_id, group_id, identity) => {
        try{
            const values = [user_id, group_id, identity];
            const insertDataQuery = 'INSERT INTO group_members (user_id, group_id, identity) VALUES (?, ?, ?)';
            const result = await queryPromise(insertDataQuery, values);
            return result.insertId;
        } catch (err) {
            console.error('Data inserted error', err);
            return false;
        }
    },
    getGroupMember: async (user_id, group_id) => {
        try {
            const values = [user_id, group_id];
            const getDataQuery = 'SELECT identity FROM group_members WHERE user_id = ? AND group_id = ?';
            const identity = await queryPromise(getDataQuery, values);
            return identity;
        } catch (err) {
            console.error('Get member error.');
            return false;
        }
    },
    getGroupMembers: async (group_id) => {
        try {
            const getDataQuery = 'SELECT user_id, identity FROM group_members WHERE group_id = ?';
            const identity = await queryPromise(getDataQuery, [group_id]);
            return identity;
        } catch (err) {
            console.error('Get member error.');
            return false;
        }
    }
}
