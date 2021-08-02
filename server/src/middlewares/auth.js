const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.verifyToken = async (req, res, next) => {
    // console.log(req)
  
    try {
        console.log(req.headers)
        const bearerHeader = req.headers.authorization;
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];

        
        const decoded = await jwt.verify(token, process.env.SECRET_JWT);
        console.log(decoded);
        const current_date = new Date().getTime();

        if (decoded.exp_date < current_date) {
            throw new Error()
        }
        const { id } = decoded;
        req.userId = id;
        next();
    }
    catch(err) {
        res.status(401).json({ message: "Authentication failed"});
    }
};

