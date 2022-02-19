const { getIngredientInfos, sumPriceProduct } = require("../helpers/sales");
const { updateImage } = require("../models/productsModel");
const { getIngredientStock, getIngredientsWithJoin,  } = require("../models/stockModel");

const updateProductImage = async (name) => {
  const image = `localhost:3000/src/uploads/${name}.png`;
  const productWithImage = await updateImage(name, image);
  return productWithImage;
}

/* 
  Nessa função, faço um mapeamento para separar o objeto com ingredientes das
  demais informações vindas do lookup. A intenção é usa-la para auxiliar na 
  construção dos valores de produtos.
 */
const getProductIngredients = async (name) => {
  const productsWithJoin = await getIngredientsWithJoin(name);
  const ingredientsPerProduct = productsWithJoin.map((products) => products.ingredients)
  return ingredientsPerProduct;
}
  
/* 
  A função serializa o retorno de ingredientes em estoque,
  separa do lookup os ingredientes por produtos.
  e faz uma soma do preço de custo dos ingredientes gasto para um produto.
*/
const generateProductReport = async (name) => {
  const ingredientsPerProduct = await getProductIngredients(name);

  const ingredientStock = await getIngredientStock();
  const allIngredientInfo = getIngredientInfos(ingredientStock);
  
  const costPrice = sumPriceProduct(ingredientsPerProduct, allIngredientInfo);

  const markupSuggestion = (costPrice * 1.30).toFixed(2);

  return {
    name,
    price: markupSuggestion,
  }
}


module.exports = {
  updateProductImage,
  getProductIngredients,
  generateProductReport
}