const connection = require("./connection");

const getProductStock = async () => {
	const db = await connection();
	const stockProducts = await db.collection("products").find({}).toArray();
	return stockProducts;
};

const getIngredientStock = async () => {
	const db = await connection();
	const stockIngredients = await db.collection("ingredients").find({}).toArray();
	return stockIngredients;
};


/* 
  A função recebe o nome de um ingrediente.
  A função faz um lookup da coleção de produtos com a coleção ingredientes.
  A função utiliza operadores match para encontrar dentro da expressão and
  o que satisfaça a condição o nome do ingrediente da coleção produto
  seja o mesmo na coleção de ingredientes, e também que a quantidade 
  em estoque seja maior que a quantidade para uso.
*/
const getIngredientsWithJoin = async (ingredientName) => {
	const db = await connection();

	const stock = await db.collection("products").aggregate([
		{ $unwind: "$ingredients" },
		{
			$lookup: {
				from: "ingredients",
				let: { product_name: "$ingredients.name", product_quantity: "$ingredients.quantity" },
				pipeline: [
					{ $match: { $expr: { $and:
            [ { $eq: ["$name", "$$product_name"] },{ $gte: ["$quantity", "$$product_quantity"] }]
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
};



module.exports = {
	getProductStock,
	getIngredientStock,
	getIngredientsWithJoin,
};
