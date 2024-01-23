const userModel = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    signup: async (req, res) => {

        try {
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;
            if(!(name && email && password)){
                return res.status(400).json({
                    message: "incomplete user's information!"
                });
              }

              const user = await userModel.getUserfromMail(req.body.email);
              if(user !== false){
                  if(user.length == 0){
                    const id = await userModel.createUser(req, res);
                    if (!id) {
                        return res.status(500).json({
                            message: 'Failed to create user',
                        });
                    }

                    const token = jwt.sign(
                        {
                            id: id,
                            name: name,
                            email: email,
                        },
                        process.env.SECRET,
                        { expiresIn: '1 hour' }
                    );
                
                    res.status(200).json({
                        message: 'Create user',
                        data: {
                            access_token: token,
                            user: {
                                id: id,
                                name: name,
                                email: email,
                            },
                        },
                    });
    
                  }
                  else{
                    console.error('Email exists!');
                    res.status(403).json({
                      message: 'Email exists!',
                    });
                  }
              }
              else{
                  return res.status(400).json({
                      message: "Insert error.",
                  });
              }
        } catch (err) {
            res.status(400).json({
                message: 'Sign up erorr.'
            });
        }
    },
    singin: async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        if(!(email && password)){
            return res.status(400).json({
                message: "Incomplete user's information!"
            });
        }

        try{
            const user_info = await userModel.getUserfromMail(req.body.email);
            if(user_info !== false){
                if(user_info.length == 0){
                    return res.status(403).json({
                        message: 'Email not exists!',
                    });
                }
                else{
                    const check = await bcrypt.compare(password, user_info[0]['password']);
                    if (check) {
                    const token = jwt.sign(
                        { 
                            id: user_info[0]['id'],          
                            name: user_info[0]['name'], 
                            email: req.body.email
                        }, process.env.SECRET, { expiresIn: '1 hour' });
            
                    res.status(200).json({
                        message: "sign in success!",
                        data: {
                            access_token: token,
                            user:{
                                id: user_info[0]['id'],
                                name: user_info[0]['name'],
                                email: user_info[0]['email']
                            }
                        }
                    });
                    }
                    else{
                    return res.status(403).json({
                        message: "Wrong password.",
                    })
                    }
                }
            }
            else{
                return res.status(500).json({
                    message: "Database error.",
                });
            }        
        } catch (err) {
            console.error(err)
            return res.status(400).json({
                message: 'Sign in error.'
            });
        }
    }
}