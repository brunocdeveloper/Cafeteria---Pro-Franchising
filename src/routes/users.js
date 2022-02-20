const Router = require('express').Router();
const { createUser } = require('../controllers/userController');
const { validateEmail, validatePassword } = require('../middlewares/validateLogin');

Router.post('/', validateEmail, validatePassword, createUser)

module.exports = Router;
