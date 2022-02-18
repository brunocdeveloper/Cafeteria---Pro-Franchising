const Router = require('express').Router();
const { createProducts } = require('../controllers/productsController');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateProductName, validateProductPrice, validateProductIngredients} = require('../middlewares/validatePostProduct');

Router.post(
  '/',
  validateJWT,
  validateProductName,
  validateProductPrice,
  validateProductIngredients,
  createProducts
);

module.exports = Router;
