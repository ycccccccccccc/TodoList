const groupMembersModel = require('../models/groupMembers');
const auth = require('../../util/auth');

module.exports = {
    createGroupMember: async (req, res) => {
        try {
            const tokenInfo = await auth.tokenInfo(req, res);
            const user_id = tokenInfo.id;
            const group_id = Number(req.params.group_id);
            const identity = req.body.identity;

            if(!(user_id && group_id && identity)){
                return res.status(400).json({
                    message: "Incomplete group member's data!"
                });
            }

            const checkExist = await groupMembersModel.getGroupMember(user_id, group_id);
            if(checkExist !== false){
                if(checkExist.length !== 0){
                    return res.status(400).json({
                        message: 'Member exist!'
                    })
                }
            }
            else{
                return res.status(500).json({
                    message: "Check member exist error.",
                });
            }

            const groupMemberID = await groupMembersModel.createGroupMenber(user_id, group_id, identity);
            if(groupMemberID !== false){
                if (!groupMemberID) {
                    return res.status(500).json({
                        message: 'Failed to create group member',
                    });
                }
                res.status(200).json({
                    message: 'Create group member',
                    data: {
                        groupmember: {
                            id: groupMemberID
                        }
                    }
                });
            }
            else{
                return res.status(400).json({
                    message: "Insert group member error.",
                });
            }
        } catch (err) {
            res.status(400).json({
                message: 'Create group member erorr.'
            });
        }
    },

}