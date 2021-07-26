const { users }  = require('../models');
require('dotenv').config();

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



