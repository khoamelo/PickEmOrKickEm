const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
   try {
        // Check if the token is provided in the request header
        const jwtToken = req.header('token');

        if (!jwtToken) {
            return res.status(403).json({ status: 'error', message: 'Not authorized' });
        }
        // Verify the token using the secret key
        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
        
        // If the token is valid, attach the user information to the request object
        req.user = payload.user;
        next();  

    } catch (err) {
        console.error(err);
        res.status(403).json({ status: 'error', message: 'Not authorized' });
    }
}