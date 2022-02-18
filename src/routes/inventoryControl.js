const Router = require('express').Router();
const { verifyQuantityToSales } = require('../controllers/stockController');

Router.get('/', verifyQuantityToSales);

module.exports = Router;