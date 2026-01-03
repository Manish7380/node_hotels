const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    //first check request headers has authorization or not
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({ error: 'Token not found'});

    //Extract the jwt token from the reuest headers
    const token = req.headers.authorization.split('')[1];   // put the bearer and token in distance
    if(!token) return res.status(401).json({ error: 'Unauthorized'});

    try{
        //verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach user information to the request object
        req.user = decoded;
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({ error: ' Invalid token'});
    }
}

//Function to generate token
const generateToken = (userData) => {
    //generate a new jwt token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 300000}); 
}
module.exports = {jwtAuthMiddleware, generateToken};