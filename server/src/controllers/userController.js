const { users }  = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailgun = require("mailgun-js");
const { exists } = require('fs');
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});
const _ = require('lodash')
require('dotenv').config();

/**
 * @description To create a new user account
 * @api /users/signup
 * @access Public
 * @type POST
 */

exports.signup = async (req, res) => {
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
        
        if(firstname === '') {
            return res.status(400).json({message: "Firstname is required!"});
        }

        if(lastname === '') {
            return res.status(400).json({message: "Lastname is required!"});
        }

        if(username === '') {
            return res.status(400).json({message: "Username is required!"});
        }

        if(username.length < 5) {
            return res.status(400).json({message: "Username must be greater than 5 characters!"});
        }
        // Email Regex
        const emailRegex = /^([a-z A-Z 0-9](\.)?)+@\w+\.(\w){2,4}$/;

        if(!emailRegex.test(email)) {
            return res.status(400).json({message: "Email is not valid!"});
        }

        // Minimum eight characters, at least one uppercase letter, one lowercase letter, 
        //one number and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if(!passwordRegex.test(password)) {
            return res.status(400).json({ 
                message: "Password must be greater than 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character"});
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

        // Check if the firstname already exists
        const alreadyExistFirstname = await users.findOne({where: {firstname: firstname}})

        if (alreadyExistFirstname) {
            return res.status(400).json({ message: "Firstname already exists!"});
        }

        // Check if the lastname already exists
        const alreadyExistLastname = await users.findOne({where: {lastname: lastname}})

        if (alreadyExistLastname) {
            return res.status(400).json({ message: "Lastname already exists!"});
        }

        // Verify a user account
        const token = jwt.sign({email: user.email,}, process.env.SECRET_JWT, { expiresIn: "1h"});
        const data = {
            from: 'no-reply@gmail.com',
            to: user.email,
            subject: 'Account Verification',
            html: `
                <h1>Hello, ${user.username}</h1>
                <p>Thank you for choosing ScholarDoor! Please confirm your email address 
                by clicking the link below</p>
                <a>${process.env.Base_URL}/users/activate-account/${token}</a>
            `
        };
        mg.messages().send(data, function (error, body) {
            if(error) {
                return res.status(400).json({errors: err.message})
            }
            return res.json({errors: 'Email has been sent and please activate your account!'})
        });

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

/**
 * @description To create a new user account
 * @api /users/verify-account/:verificationCode
 * @access Public <Only via email>
 * @type GET
 */

exports.activateAccount = async (req, res) => {
    
    try {
        const {token} = req.body

        await jwt.verify(token, process.env.SECRET_JWT);
        const user = await users.findOne({where: {_id: token}});
        
            if(!user) {
                res.status(403).json({ 
                    message: 'User with this email already exists'})
            }
            
            const newUser = new user({...user.data});
            await newUser.save();
            await user.remove();
            res.json({message: `User ${token} has been activated.`})
    }
    catch(err) {
        return res.status(500).json(err.message);
    }
}
// exports.verifyAccount = async (req, res) => {
    
//     try {
//         const {verificationCode} = req.params;
//         const user = await users.findOne({where: {verificationCode}});

//             if(!user) {
//                 return res.status(401).json({
//                     message: 'Unthorized access and invalid verification code!'
//                 });
//             }
//             user.verified = true;
//             user.verificationCode = undefined;
//             users.create(user).then(user => {
//                 return res.status(200).json({
//                     message: "User successfully registered!",
//                 });
//             }).catch(err => {
//                 return res.status(500).json({
//                     message: "Something went wrong!",
//                 })
//             });      
//     }
//     catch(err) {
//         res.status(500).json(err.message);
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
 * @description Forgot password
 * @api /users/forgot-password
 * @access Restricted <Only via email>
 * @type GET
 */

exports.forgotPassword = async (req, res) => {
    const {email} = req.body

    try {
        const user = await users.findOne({where: {email: email}}, );
        
        if(user === null) {
            res.status(401).json({
                message: " User doesn't exits!"
            }); 
        }

        const token = jwt.sign({email: email}, process.RESET_PASSWORD_KEY, { expiresIn: "1h"});
        const data = {
            from: 'no-reply@gmail.com',
            to: user.email,
            subject: 'Forgot Password',
            html: `
                <h1>Hello, ${user.username}</h1>
                <p>Thank you for choosing ScholarDoor! Please confirm your email address 
                by clicking the link below</p>
                <a>${process.env.Base_URL}/users/forgot-password/${token}</a>
            `
        };

        return users.update({resetPasswordToken: token}, (err, success) =>{
            if(err) {
                res.status(400).json({
                    message: "Reset password link error"
                });
            } else {
                mg.messages().send(data, (error, body) =>{
                    if(error) {
                        return res.status(400).json({errors: err.message})
                    }
                    return res.json({message: 'Email has been sent and please follow the instruction!'})
                });
            }
        });
        
    }
    catch(err) {
        return res.status(500).json(err.message);
    }
    
}

/**
 * @description Reset password
 * @api /users/reset-password
 * @access Restricted <Only via email>
 * @type GET
 */

exports.resetPassword = async (req, res) => {

    try {
        const {resetPasswordToken, newPassword} = req.body;
        await jwt.verify(resetPasswordToken, process.env.RESET_PASSWORD_KEY, (error, decodedData) =>{
            if(error) {
                return res.status(401).json({
                    message: 'Incorrect token or token is expired.'
                })
            }
        });
        const user = await users.findOne({where: {resetPasswordToken: resetPasswordToken}});    
            if(!user) {
                res.status(403).json({ 
                    message: 'User with this token does not exists.'})
            }
            const obj = {
                password: newPassword
            }

            user = _.extend(user, obj);

            users.create(user).then(user => {
                return res.status(200).json({
                    message: "Your password has been changed.",
                });
            }).catch(err => {
                return res.status(500).json({
                    message: "Error with Reset password.",
                })
            });      

    }
    catch(err) {
        return res.status(500).json(err.message);
    }
}

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



