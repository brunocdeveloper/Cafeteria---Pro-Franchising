const jwt = require('jsonwebtoken');
const { findUser } = require('../services/users');

const SECRET = 'minhachavesecreta';

/* A função verifica se existe o token através do 
authorization da requisição caso não haja, retorna um 401 indicando
não autorizado. 
Caso exista o token, a função decodifica usando o token e a chave segredo
para montar o objeto vindo da requisição.
Então buscamos pelo usuario encontrado no objeto e damos um next na função.
 */

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
