const Router = require('express').Router();
const { createProducts } = require('../controllers/productsController');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateIngredients, validatePrice, validateName } = require('../middlewares/validatePostProduct');

Router.post(
  '/',
  validateJWT,
  validateName,
  validatePrice,
  validateIngredients,
  createProducts
);

module.exports = Router;
