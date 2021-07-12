const { users }  = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Signup
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

        const emailRegex = /^([a-z A-Z 0-9](\.)?)+@\w+\.(\w){2,4}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if(!emailRegex.test(email)) {
            return res.status(400).json({message: "Email is not valid!"});
        }

        // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
        if(!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Password is not valid!"});
        }

        // Create users
        const alreadyExitsUser = await users.findOne({ 
            where: {
                email: email
            } 
        });

        if(alreadyExitsUser === null) {

            users.create(user).then(user => {
                return res.status(200).json({
                    message: "User successfully registered!",
                });
            }).catch(err => {
                return res.status(500).json({
                    message: "Something went wrong!",
                })
            });
        } else {
            return res.status(403).json({ message: "Email is already in use!"});
        }
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