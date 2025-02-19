
const jwt = require("jsonwebtoken");
const User = require("../models/User");


async function userAuth(req, res, next) {
    try {
   
    const authHeader = req.headers["Authorization"] || req.headers["authorization"];
    // console.log(authHeader);

    if (!authHeader) {
        throw new Error('Authorization header missing');
    }

  
    const [bearer, token] = authHeader.split(' ');
    // console.log(bearer,token);
    if (bearer !== 'Bearer' || !token) {
        throw new Error('Invalid token format');
    }


    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired token ' + error);
    }

    const user = await User.findById(decoded.userId).select('_id');

    if (!user) {
        throw new Error('User no longer exists');
    }

    req.userId = user._id.toString(); 
    next(); 
} catch(err){
    return res.status(500).json({ message:err.message });
}
}

module.exports = userAuth;