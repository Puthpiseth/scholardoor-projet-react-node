const { users }  = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});
require('dotenv').config();

/**
 * @description To create a new user account
 * @api /users/signup
 * @access Public
 * @type POST
 */

exports.createAccount = async (req, res) => {
    const {firstname, lastname, username, email, password} = req.body;
    
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        
        const user = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: hashPassword,
            verificationCode: crypto.randomBytes(64).toString('hex'),
        }
        
        // Check if the email already exists
        const alreadyExistEmail = await users.findOne({where: {email: email}})

        if (alreadyExistEmail) {
            return res.status(400).json({ message: "Email already exists!"});
        }

        // Check if the username already exists
        const alreadyExistUsername = await users.findOne({where: {username: username}})

        if (alreadyExistUsername) {
            return res.status(400).json({ message: "username already exists!"});
        }

        // // Verify a user account
        // const token = jwt.sign({email: user.email,}, process.env.SECRET_JWT, { expiresIn: "1h"});
        // const data = {
        //     from: 'no-reply@gmail.com',
        //     to: user.email,
        //     subject: 'Account Verification',
        //     html: `
        //         <h1>Hello, ${user.username}</h1>
        //         <p>Thank you for choosing ScholarDoor! Please confirm your email address 
        //         by clicking the link below</p>
        //         <p>${process.env.Base_URL}/users/activate-account/${token}</p>
        //     `
        // };
        // mg.messages().send(data, function (error, body) {
        //     if(error) {
        //         return res.status(400).json({error})
        //     }
        //     return res.json({errors: 'Email has been sent and please activate your account!'})
        // });

        // Create a new user
        users.create(user).then(user => {
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
//  * @description To create a new user account
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
    console.log(email, password)
    try {
        const user = await users.findOne({where: {email: email}});
    
        if(user === null){
            res.status(401).json({
                message: " User doesn't exits!"
            }); 
        } else {
            await bcrypt.compare(password, user.password, (err, result) =>{
                if(result) {
                    // Create token
                    const token = jwt.sign({email: user.email,}, process.env.SECRET_JWT, { expiresIn: "1h"})
                    return res.status(200).json({message: " Authentication success!", token}); 
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

/**
 * @description To update a user profile's infos
 * @api /users/edit/:id
 * @access Private 
 * @type PUT
 */

 exports.updateUserProfile = async (req, res) => {

    const {firstname, lastname, username, email} = req.body;

    try {
        const user = await users.update({
            firstname: firstname, lastname: 
            lastname, username: username, 
            email: email
        }, {where: {id: req.params.id}});
        
        if(user) {
            res.status(200).json({message: "Successfully update user!"});
        } else {
            res.status(404).json({message: "User not found!"});
        }
    } 
    catch(err) {
        res.status(500).json({message: "Cannot update user!"});
    }
};

/**
 * @description To delete a user profile
 * @api /users/delete/:id
 * @access Private 
 * @type DELETE
 */

exports.deleteUserProfile = async (req, res) => {

    try {
        const user = await users.destroy({where: {id: req.params.id}});
        if(user) {
            res.status(200).json({message: "Successfully delete user!"});
        } else {
            res.status(404).json({message: "User not found!"});
        }
    } 
    catch(err) {
        res.status(500).json({message: "Cannot delete user!"});
    }
};
