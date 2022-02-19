const { 
  filterIngredientsByProducts,
  checkQuantityForSale, 
  getIngredientInfos} = require("../helpers/sales");

const {
  getProductStock,
  getIngredientStock,
  getIngredientsWithJoin, 
} = require("../models/stockModel")

const searchStockIgredients = async (_req, res) => {
  // const products = await getProductStock();
  const ingredients = await getIngredientStock();
  const ingredientInfos = getIngredientInfos(ingredients);
 
  return res.status(200).json({ ingredientInfos });
};

const verifyQuantityToSales = async (req, res) => {
  const { name } = req.body;

  /* busco pelos meus produtos e retorno os ingredientes dele baseado no produto escolhido */
  const products = await getProductStock();
  const productsIngredients = filterIngredientsByProducts(name, products);

  /* Busca pelos lookup dos produtos com ingredientes */
  const ingredients = await getIngredientsWithJoin(name);
  console.log(ingredients);
  /* Checa se o produto pode ser vendido com base na quantidade dos ingredientes */
  const negativeProduct = checkQuantityForSale(ingredients, productsIngredients);
  if (negativeProduct.length === 0) {
    return res.status(200).json({ message: 'Ok' })
  };
  
  console.log(negativeProduct);
  return res.status(401).json(
    { message: `Unauthorized. Missing product: ${negativeProduct}`}
  );
}


module.exports = {
  searchStockIgredients,
  verifyQuantityToSales,
};