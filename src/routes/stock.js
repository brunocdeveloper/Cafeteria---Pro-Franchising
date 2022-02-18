const Router = require('express').Router();
const multer = require('multer');

const { searchStock, createProducts } = require('../controllers/stockController');
const { validateJWT } = require('../middlewares/validateJWT');

/* Configura o multer com o destino e o formato que será
salvo o arquivo */
const storage = multer.diskStorage({
  destination: (req, _file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, _file, callback) => {
    const {id} = req.params;
    callback(null, `${id}.jpeg`)
  }
});

Router.get('/', validateJWT, searchStock);

module.exports = Router;
