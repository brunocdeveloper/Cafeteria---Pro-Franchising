const { getProductReport } = require('../controllers/reportController');
const { validateJWT } = require('../middlewares/validateJWT');

const Router = require('express').Router();

Router.get(
  '/product',
  validateJWT,
  getProductReport,  
);

module.exports = Router;
