const express = require('express');
const route = require('../routes/index');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'ok' });
});

app.use('/user', route.users)

module.exports = app;
