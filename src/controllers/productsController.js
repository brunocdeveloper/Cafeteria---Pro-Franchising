const { generateProduct, findProductByName } = require("../models/productsModel");

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
}

module.exports = {
  createProducts,
}