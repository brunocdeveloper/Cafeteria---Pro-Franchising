const Router = require('express').Router();
const multer = require('multer');
const { editIngredientByName } = require('../controllers/ingredientsController');
const { editProductImage } = require('../controllers/productsController');

const { searchStockIgredients } = require('../controllers/stockController');
const { validateJWT } = require('../middlewares/validateJWT');
const { validatePutIngredients } = require('../middlewares/validatePostIngredients');

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

Router.get('/', validateJWT, searchStockIgredients);

Router.put(
  '/product/:name',
  validateJWT,
  uploads.single('image'),
  editProductImage,
)

Router.put(
  '/ingredients',
  validateJWT,
  validatePutIngredients,
  editIngredientByName
)

module.exports = Router;
