const Router = require('express').Router();
const { createProducts } = require('../controllers/productsController');
const { validateJWT } = require('../middlewares/validateJWT');

Router.post('/', validateJWT, createProducts);

module.exports = Router;
