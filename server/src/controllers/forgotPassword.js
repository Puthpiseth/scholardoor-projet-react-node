const { users }  = require('../models');
const jwt = require('jsonwebtoken');
const { exists } = require('fs');
const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});
require('dotenv').config();

/**
 * @description Forgot password
 * @api /users/forgot-password
 * @access Restricted <Only via email>
 * @type GET
 */

 exports.forgotPassword = async (req, res) => {
    const {email} = req.body

    try {
        const user = await users.findOne({where: {email: email}});
        
        if(!user) {
            res.status(404).json({
                message: " User doesn't exits!"
            }); 
        }

        const token = jwt.sign({email: email}, process.RESET_PASSWORD_KEY, { expiresIn: "1h"});
        const data = {
            from: 'no-reply@gmail.com',
            to: user.email,
            subject: 'Account Activation Link',
            html: `
                <h1>Hello, ${user.username}</h1>
                <p>Thank you for choosing ScholarDoor! Please confirm your email address 
                by clicking the link below</p>
                <a>${process.env.Base_URL}/users/forgot-password/${token}</a>
            `
        };

        return users.updateOne({resetPasswordToken: token}, (err, success) =>{
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