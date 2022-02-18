/* A função recebe o como parâmetro o nome do produto a ser vendido, e o
array de produtos retornados pela api. Então o array é filtrado 
com o nome do produto e depois mapeado com os seus ingredientes. */
const filterIngredientsByProducts = (nameProduct, products) => {
  const filterIngredients = products
  .filter((items) => items.name === nameProduct)
  .map((ingredient) => ingredient.ingredients)[0];

  const nameIngredients = filterIngredients.map((items) => items.name);

  return nameIngredients;
};

/* 
  A função recebe como parametro o lookup dos produtos e ingredientes, e o nome dos
  ingredientes que vai nos produtos. Então o nome dos ingredientes é mapeado em um array
  ingredientNames.
  Por meio de um forEach é feito a comparação de ingredientes que estão contido na tabela
  produtos e os ingredientes que vieram filtrados do lookup (OBS: o lookup só trás 
  ingredientes que no inventário tem a quantidade maior do que para ser produzido).
*/
const checkQuantityForSale = (ingredients, productsIngredients) => {
  const ingredientNames = ingredients.map((items) => items.ingredients.name);

  const joinIngredients = [];
  productsIngredients.forEach((names) => {
    if (!ingredientNames.includes(names)) {
      joinIngredients.push(names);
    }
  });

  if (joinIngredients === []) return null;
  return joinIngredients;
}

module.exports = {
  filterIngredientsByProducts,
  checkQuantityForSale,
}