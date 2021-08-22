const { Users }  = require('../models');
require('dotenv').config();


/**
 * @description To create profile of the authenticated user
 * @api /update-profile
 * @access Private 
 * @type PATCH <multipart form> request
 */
exports.createUserProfile = async (req, res) => {
    console.log(req)
    try {
        const {firstname, lastname, position, affiliation, researchInterest, location} = JSON.parse(req.body.profile);
        let avatar = null;
        
        const profile = {
            firstname,
            lastname,
            position,
            affiliation,
            researchInterest,
            location,
        }
        if(req.files) {
            avatar = req.files.avatar.data.toString(`base64`);
            profile.avatar = avatar;
        }
        
        // console.log(profile);
        const response = await Users.update(profile, {where: {id: req.userId}});
            res.status(200).json(response);
        console.log(response)
        if(profile) {
            res.status(200).json({message: "Successfully create user!"});
            } else {
                res.status(404).json({message: "User not found!"});
            }
    }
    catch(err) {
        res.status(500).json({message: "Cannot create user!"});
    }
}

/**
 * @description To get profile of the authenticated user
 * @api /my-profile
 * @access Private 
 * @type GET <multipart form> request
 */
//  exports.getUserProfile = async (req, res) => {
//     console.log(req)
//     try {
//         const {username, position, affiliation, researchInterest, location} = req.body;
//         let avatar = null;
        
//         const profile = {
//             username,
//             position,
//             affiliation,
//             researchInterest,
//             location,
//         }
//         if(req.files) {
//             avatar = req.files.avatar.data.toString(`base64`);
//             profile.avatar = avatar;
//         }
//         // console.log(profile);
//         const response = await Users.findOne(profile, {where: {id: req.userId}});
//             res.status(200).json(response);
//         // console.log(response)
//         if(!profile) {
//             res.status(404).json({message: "Your profile is not available!"});
//             } 
//             res.status(200).json({profile})
//     }
//     catch(err) {
//         res.status(500).json({message: "Unable to get user!"});
        
//     }
//  }
/**
 * @description To update profile info of the authenticated user
 * @api /update-profile
 * @access Private 
 * @type PATCH <multipart form> request
 */
 exports.updateUserProfile = async (req, res) => {
    console.log(req)
    try {
        const {firstname, lastname, position, affiliation, researchInterest, location} = JSON.parse(req.body.profile);
        let avatar = null;
        
        const profile = {
            firstname,
            username,
            position,
            affiliation,
            researchInterest,
            location,
        }
        if(req.files) {
            avatar = req.files.avatar.data.toString(`base64`);
            profile.avatar = avatar;
        }
        
        const response = await Users.update(profile, {where: {id: req.userId}});
            res.status(200).json(response);
        if(profile) {
            res.status(200).json({message: "Successfully update user!"});
            } else {
                res.status(404).json({message: "User not found!"});
            }
    }
    catch(err) {
        res.status(500).json({message: "Cannot update user!"});
    }
}

/**
 * @description To delete a user profile
 * @api /delete-profile/:id
 * @access Private 
 * @type DELETE
 */

exports.deleteUserProfile = async (req, res) => {

    try {
        const user = await Users.destroy({where: {id: req.params.id}});
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