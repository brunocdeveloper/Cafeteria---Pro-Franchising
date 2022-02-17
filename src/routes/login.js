const Router = require('express').Router();
const { loginTo } = require('../controllers/loginController');
const { validateEmail, validatePassword } = require('../middlewares/validateLogin');

Router.post('/', validateEmail, validatePassword , loginTo);

module.exports = Router;
