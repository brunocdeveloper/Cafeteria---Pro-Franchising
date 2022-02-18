const Router = require('express').Router();
const { createIngredients } = require('../controllers/ingredientsController');
const { validateJWT } = require('../middlewares/validateJWT');


Router.post('/', validateJWT, createIngredients);

module.exports = Router;
