const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
require('dotenv').config();
const { queryPromise } = require('../../util/db'); 

module.exports = {
    createUser: async (req, res) => {
        try{
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);
            const values = [req.body.name, req.body.email, hashedPassword];
            const insertDataQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            const result = await queryPromise(insertDataQuery, values);
            return result.insertId;
        } catch (err) {
            console.error('Data inserted error', err);
            return false;
        }
    },
    getUserfromMail: async (email) => {
        try{
            const selectDataQuery = 'SELECT id, name, password FROM users WHERE email = ?'
            const result = await queryPromise(selectDataQuery, [email]);
            return result;
        } catch(err){
            console.error('Get user from mail error')
            return false;
        }
    }
}
