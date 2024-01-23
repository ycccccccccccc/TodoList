const jwt = require('jsonwebtoken');

module.exports = {
    auth: async (req, res, next) => {
        var token = req.header('Authorization')
        
        if ( !token ) {
            console.error('Authorization error!')
            return res.status(401).send({
                message: 'Token empty!'
            });
        }
    
        token = token.replace('Bearer ', '');
        try {
            const decoded = jwt.verify(token, process.env.SECRET)
            next();
        } catch (err) {
            return res.status(403).json({
                message: "Can not find the user's mail from token."
            })
        }
    },
    tokenInfo: (req, res) => {
        var token = req.header('Authorization')
        token = token.replace('Bearer ', '');
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            return decoded;
        } catch (err) {
            return res.status(403).json({
                message: "Can not find the user's mail from token."
            })
        }
    }
}