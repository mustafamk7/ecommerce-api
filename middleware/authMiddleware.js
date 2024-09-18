const { verifyToken } = require('../utils/jwt');

const authenticate = (req, res, next) => {
  // const token = req.headers['authorization']?.split(' ')[1];
  console.log("Lets start");
  const token = req.cookies.tokenId;  

  console.log("Token is ", token);

  if (!token) {
    //return res.status(401).json({ message: 'No token provided' });
    throw new Error("Please login")
  }

  try {
    const data = verifyToken(token);
    console.log("The data from toke is ", data);
    req.user = data;
    next(); 
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = authenticate;
