const jwt = require('jsonwebtoken');

const SECRET_KEY = 'mustafa';

const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: 86400 });
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = {
  generateToken,
  verifyToken,
};
