const Router = require('express').Router();
const { createUser } = require('../controllers/userController');

Router.post('/', createUser)

module.exports = Router;
