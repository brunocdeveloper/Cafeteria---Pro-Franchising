const express = require('express');
const route = require('../routes/index');
const path = require('path');

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

app.use('/report', route.report);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')))

module.exports = app;
