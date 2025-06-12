const jwt = require('jsonwebtoken');

function jwtGenerator(userId) {
  const payload = {
    user: {
      id: userId
    }
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = jwtGenerator;
