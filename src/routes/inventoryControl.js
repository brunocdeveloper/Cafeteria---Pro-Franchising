const Router = require('express').Router();
const { verifyQuantityToSales } = require('../controllers/stockController');
const { validateJWT } = require('../middlewares/validateJWT');

Router.get('/', validateJWT, verifyQuantityToSales);

module.exports = Router;