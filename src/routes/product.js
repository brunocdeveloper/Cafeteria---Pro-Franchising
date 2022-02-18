const Router = require('express').Router();
const { createProducts } = require('../controllers/productsController');

Router.post('/', createProducts);

module.exports = Router;
