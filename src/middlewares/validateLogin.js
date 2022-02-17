const { findUser } = require('../services/users');

/* 
  O regex de validação de email foi consultado na Stack Overflow.
 */

const verifyEmail = (email) => {
  const validation = /\S+@\S+\.\S+/;
  return validation.test(email);
}

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const validate = verifyEmail(email);
  const user = findUser(email);
  if(!email || !validate) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  if (!user) {
    return res.status(401).json({ message: 'Incorrect email or inexistent' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  
  if (!password) return res.status(401).json('All fields must be filled');

  next();
};

module.exports = {
  validateEmail,
  validatePassword
}