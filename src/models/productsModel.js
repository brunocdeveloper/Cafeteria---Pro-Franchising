const connection = require('./connection');

const findProductByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const generateProduct = async ({ name, image, price, ingredients }) => {
  const db = await connection();
 
  const product = db.collection('products').insertOne({
    name,
    image,
    price,
    ingredients
  });

  return {
    _id: product.insertedId,
    name,
    image,
    price,
    ingredients
  };
}

module.exports = { 
  generateProduct,
  findProductByName,
};
