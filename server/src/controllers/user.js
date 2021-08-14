const { Users }  = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * @description To create a new user account
 * @api /users/signup
 * @access Public
 * @type POST
 */

exports.createAccount = async (req, res) => {
    const {firstname, lastname, username, email, password} = req.body;
    console.log(req.body)
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        
        const user = {
            firstname,
            lastname,
            username,
            email,
            password: hashPassword,
        }
        
        // Check if the email already exists
        const alreadyExistEmail = await Users.findOne({where: {email}})

        if (alreadyExistEmail) {
            return res.status(400).json({ message: "Email already exists!"});
        }

        // Check if the username already exists
        const alreadyExistUsername = await Users.findOne({where: {username}})

        if (alreadyExistUsername) {
            return res.status(400).json({ message: "Username already exists!"});
        }

         // Create a new user
        Users.create(user).then(user => {
            return res.status(200).json({
                message: "User successfully registered!",
            });
        }).catch(err => {
            return res.status(500).json({
                message: "Something went wrong!",
            })
        });       

    } 
    catch(err) {
        return res.status(500).json(err.message);
    }
}

// /**
//  * @description To activate a user account
//  * @api /users/verify-account/:verificationCode
//  * @access Public <Only via email>
//  * @type GET
//  */

// exports.activateAccount = async (req, res, next) => {
    
//     try {
//         const {token} = req.body

//         await jwt.verify(token, process.env.SECRET_JWT);
//         const user = await users.findOne({where: {_id: token}});
        
//             if(!user) {
//                 res.status(403).json({ 
//                     message: 'User with this email already exists'})
//             } else {
//                 next();
//             }
            
//             const newUser = new user({...user.data});
//             await newUser.save();
//             await user.remove();
//             res.json({message: `User with this ${token} has been activated.`})
//     }
//     catch(err) {
//         return res.status(500).json(err.message);
//     }
// }

/**
 * @description To authenticate a user and get an auth token
 * @api /users/signin
 * @access Private
 * @type POST
 */

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        const user = await Users.findOne({where: {email}});
        
        if(!user){
            res.status(401).json({
                message: " User doesn't exist!"
            }); 
        } else {
            await bcrypt.compare(password, user.password, (err, result) =>{
                if(result) {
                    // Create token
                    const exp_date = new Date().getTime() + 60 * 60 * 1000
                    const token = jwt.sign({id: user.id, exp_date}, process.env.SECRET_JWT)
                        return res.status(200).json({message: "Authentication success!", token}); 
                } else {
                    res.status(401).json({
                        message: " Incorrect password!"
                    }); 
                }
            });
        }
    } 
    catch(err) {
        return res.status(500).json(err.message);
    }
};


