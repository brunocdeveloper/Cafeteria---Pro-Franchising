const { updateImage } = require("../models/productsModel");

const updateProductImage = async (name) => {
  const image = `localhost:3000/src/uploads/${name}.png`;
  const productWithImage = await updateImage(name, image);
  return productWithImage;
}

module.exports = {
  updateProductImage,
}