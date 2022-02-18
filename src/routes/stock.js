const Router = require('express').Router();
const { searchStock } = require('../controllers/stockController');

Router.get('/', searchStock);

module.exports = Router;
