const Router = require('express').Router();
const multer = require('multer');
const { editProductImage } = require('../controllers/productsController');

const { searchStock, createProducts } = require('../controllers/stockController');
const { validateJWT } = require('../middlewares/validateJWT');

/* Configura o multer com o destino e o formato que será
salvo o arquivo */
const storage = multer.diskStorage({
  destination: (req, _file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, _file, callback) => {
    const { name } = req.params;
    callback(null, `${name}.png`)
  }
});

const uploads = multer({ storage });

Router.get('/', validateJWT, searchStock);

Router.put(
  '/product/:name',
  validateJWT,
  uploads.single('image'),
  editProductImage,
)

module.exports = Router;
