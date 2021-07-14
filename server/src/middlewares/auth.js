const { users } = require('../models');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail')
require('dotenv').config();


exports.verifyToken = async (req, res, next) => {
    
    try {
        const bearerHeader = req.headers['authorization'];
        const bearer = bearerHeader.split(' ');

        if (typeof bearer !== 'undefined') {        
            req.token = bearer[1];
        }

        const data = await jwt.verify(req.token, process.env.SECRET_JWT);
        const email = data.email;
        const user = await users.findOne({where: {email: email}});
        
        if(!user) {
            res.status(403).json({ message: 'User not authenticated!'})
        } else {
            next();
        }
    }
    catch(err) {
        res.status(400).json({ message: "Invalid Token!"});
    }
};

