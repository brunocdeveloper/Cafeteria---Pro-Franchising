const users = require('./users');
const login = require('./login');
const stock = require('./stock');
const inventory = require('./inventoryControl');
const product = require('./product');
const ingredient = require('./ingredients');
const report = require('./report');

module.exports = { 
  users,
  login,
  stock,
  inventory,
  product,
  ingredient,
  report
};
