const express = require('express');
const route = require('../routes/index');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'ok' });
});

app.use('/user', route.users);

app.use('/login', route.login);

app.use('/stock', route.stock);

app.use('/inventory', route.inventory);

app.use('/product', route.product);

app.use('/ingredient', route.ingredient);

module.exports = app;
