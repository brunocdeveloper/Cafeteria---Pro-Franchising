const { generateProduct, findProductByName } = require("../models/productsModel");
const { updateProductImage } = require("../services/products");

const createProducts = async (req, res) => {
  const { name, image, price, ingredients } = req.body;
  const verifyExistenceProduct = await findProductByName(name);

  if (verifyExistenceProduct) {
    return res.status(409).json(
      { message: `${name} already exists. Maybe the best is to edit it`}
    )
  }

  const newProduct = await generateProduct({name, image, price, ingredients});
  return res.status(201).json(newProduct);
};

const editProductImage = async (req, res) => {
  const { name } = req.params;
  if (!name) return res.status(401).json({ message: 'Missing params valid!'})
  const updateProduct = await updateProductImage(name);
  return res.status(200).json(updateProduct);
};

module.exports = {
  createProducts,
  editProductImage,
};
