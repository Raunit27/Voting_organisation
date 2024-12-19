const jwt =require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next)=>{
    // Check if the request headers have authorization or not
   
    const authorization = req.headers.authorization;
    if (!authorization) {
        console.log("Authorization header is missing.");
        return res.status(401).json({ error: 'Token Not Found' });
    }

    // Check if the authorization header contains the expected format
    const parts = authorization.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        console.log("Authorization header format is incorrect.");
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = parts[1];
    if (!token) {
        console.log("Token is missing.");
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        //verify the JWT token 
        const decoded = jwt.verify(token,process.env.JWT_SERCET);
        //Attach user information to the request object 
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({error:'unauthorized'});
    }
}

// function to generate JWT token
const generateToken = (userData)=>{
    //Generate a new jwt token using user data
    return jwt.sign(userData,process.env.JWT_SERCET);
} 


module.exports = {jwtAuthMiddleware,generateToken}