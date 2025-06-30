const jwt = require('jsonwebtoken');

function jwtGenerator(userId) {
  // Create the payload with the user's ID
  const payload = {
    user: {
      id: userId
    }
  };

  // Sign the JWT with the secret key and set it to expire in 1 hour
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Export the jwtGenerator function for use in other modules
module.exports = jwtGenerator;
