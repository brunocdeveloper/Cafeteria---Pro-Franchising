const connection = require('./connection');

const getProductStock = async () => {
  const db = await connection();
  const stockProducts = await db.collection('products').find({}).toArray();
  return stockProducts;
};

const getIngredientStock = async () => {
  const db = await connection();
  const stockIngredients = await db.collection('ingredients').find({}).toArray();
  return stockIngredients;
}

const getIngredientsWithJoin = async (ingredientName) => {
  const db = await connection();
  const stock = await db.collection('products').aggregate([
    { $unwind: "$ingredients" },
    {
      $lookup: {
        from: "ingredients",
        let: { product_name: "$ingredients.name", product_quantity: "$ingredients.quantity" },
        pipeline: [
          { $match: { $expr: { $and:
            [
              { $eq: ["$ingredient_name", "$$product_name"] },
              { $gte: ["$quantity", "$$product_quantity"] },
            ]
          } } },
          { $project: {
            _id: 0,
          }},
        ],
        as: "product_ingredients",
      }
    },
    { $unwind: "$product_ingredients" },
    { $match: { name: ingredientName }},
    {
      $project: {
        _id: 0,
        image: 0,
        price: 0,
      }
    }
  ]).toArray();
  return stock;
}


module.exports = {
  getProductStock,
  getIngredientStock,
  getIngredientsWithJoin
};
