const { users }  = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
            return res.status(400).json({ message: "Password is not valid!"});
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
        res.status(500).json(err.message);
    }
}

// Signin
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
        res.status(500).json(err.message);
    }

};

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



