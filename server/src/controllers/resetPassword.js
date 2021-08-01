const { users }  = require('../models');
const jwt = require('jsonwebtoken');
const _ = require('lodash')
require('dotenv').config();

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
                res.status(404).json({ 
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
