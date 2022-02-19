/* A função recebe o como parâmetro o nome do produto a ser vendido, e o
array de produtos retornados pela api. Então o array é filtrado 
com o nome do produto e depois mapeado com os seus ingredientes. */
const filterIngredientsByProducts = (productName, products) => {
  const filterIngredients = products
  .filter((items) => items.name === productName)
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


/* Recebe um parâmetro que vem direto do banco de dados e faz um pequeno
serialize para uma melhor tratamento da informação.
A função também é reutilizada para apresentação de dados na api */
const getIngredientInfos = (data) => {
  const ingredientInfos = data.map((items) => ({
    name: items.name,
    quantity: items.quantity,
    measure: items.measure,
    pricePerMeasure: (items.cost.price / items.cost.measurement ),
    pricePerSupplier: `${items.cost.measurement} ${items.cost.size} por ${items.cost.price}`,
  }));
  return ingredientInfos;
}

/* 
A função recebe um array com os ingredientes de um produto e um array com
a informação dos ingredientes. Filtra os ingredientes e calcula o preço de custo
baseado nas informações de preço por medida do ingrediente x quantidade gasta para 
fazer o produto.
*/
const sumPriceProduct = (ingredientsPerProduct, allIngredientInfo) => {
  const priceProducts = [];

  ingredientsPerProduct.filter((items) => (
    allIngredientInfo.find((ingredients) => {
      if (items.name === ingredients.name) {
        priceProducts.push(items.quantity * ingredients.pricePerMeasure)
      }
    })
  ))
  const sumTotal = priceProducts.reduce((acc, currentValue) => acc + currentValue, 0);
  return sumTotal;
}


module.exports = {
  filterIngredientsByProducts,
  checkQuantityForSale,
  getIngredientInfos,
  sumPriceProduct
}