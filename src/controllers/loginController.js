const jwt = require('jsonwebtoken');
const md5 = require('md5');

const { findUser } = require('../services/users');

const SECRET = 'minhachavesecreta';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};


const loginTo =  async (req, res) => {
  const { email, password } = req.body;

  const encryptPassword = md5(password);
  const user = await findUser(email);
  const token = jwt.sign(user, SECRET, jwtConfig);

  if (user.password === encryptPassword && user.email === email) {
    return res.status(200).json({ token });
  }
}

module.exports = {
  loginTo,
}