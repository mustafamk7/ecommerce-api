const authenticate = require('./authMiddleware');

const authorizeAdmin = (req, res, next) => {
  authenticate(req, res, () => {
    // console.log(req.user.role);
    
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  });
};

module.exports = authorizeAdmin;
