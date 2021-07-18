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
        
        // User infos are required

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
        
        // User's email regex is required
        const emailRegex = /^([a-z A-Z 0-9](\.)?)+@\w+\.(\w){2,4}$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({message: "Email is not valid!"});
        }

        // User's password regex is required
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
                <p>${process.env.Base_URL}/users/activate-account/${token}</p>
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

exports.activateAccount = async (req, res, next) => {
    
    try {
        const {token} = req.body

        await jwt.verify(token, process.env.SECRET_JWT);
        const user = await users.findOne({where: {_id: token}});
        
            if(!user) {
                res.status(403).json({ 
                    message: 'User with this email already exists'})
            } else {
                next();
            }
            
            const newUser = new user({...user.data});
            await newUser.save();
            await user.remove();
            res.json({message: `User with this ${token} has been activated.`})
    }
    catch(err) {
        return res.status(500).json(err.message);
    }
}

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