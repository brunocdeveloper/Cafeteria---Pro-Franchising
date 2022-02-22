const jwt = require('jsonwebtoken');
const md5 = require('md5');

const { findUser } = require('../services/users');

const SECRET = 'minhachavesecreta';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};


/* 
  Valida se o usuário existe no banco de dados.
  valida as senhas (que foram cadastradas encriptografadas)
  e também gera um token jwt para controle de rotas com login.
*/
const loginTo =  async (req, res) => {
  const { email, password } = req.body;

  const encryptPassword = md5(password);
  const user = await findUser(email);
  if(!user) {
    return res.status(401).json({ message: 'Incorrect email or inexistent' });
  }
  const token = jwt.sign(user, SECRET, jwtConfig);

  if (user.password === encryptPassword && user.email === email) {
    return res.status(200).json({ token });
  }
}

module.exports = {
  loginTo,
}

