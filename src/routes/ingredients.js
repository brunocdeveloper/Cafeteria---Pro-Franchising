const Router = require('express').Router();
const { createIngredients } = require('../controllers/ingredientsController');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateIngredientName, validateIngredientQuantity, validateIngredientMeasure, validateIngredientCost } = require('../middlewares/validatePostIngredients');


Router.post(
  '/',
  validateJWT,
  validateIngredientName,
  validateIngredientQuantity,
  validateIngredientMeasure,
  validateIngredientCost,
  createIngredients
);

module.exports = Router;
