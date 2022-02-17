const jwt = require('jsonwebtoken');
const { findUser } = require('../services/users');

const SECRET = 'minhachavesecreta';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json(
    { message: 'Unauthorized. Missing token validation'}
  );

  try {
    const decoded = jwt.verify(token, SECRET);
    if (!decoded) return res.status(401).json({ message: 'missing auth token' });
    const user = await findUser(decoded.email);
    if (!user) return res.status(401).json({ message: 'JWT malformed' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'JWT malformed' });
  }
};

module.exports = { 
  validateJWT
};
