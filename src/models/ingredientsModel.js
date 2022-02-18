const connection = require('./connection');

const findIngredientByName = async (name) => {
  const db = await connection();
  const ingredient = await db.collection('ingredients').findOne(
    { ingredient_name: name }
  );
  return ingredient;
};

const generateIngredients = async ({ingredient_name, quantity, measure, cost}) => {
  const db = await connection();
  const ingredient = db.collection('ingredients').insertOne({
    ingredient_name,
    quantity,
    measure,
    cost,
  })

  return {
    _id: ingredient.insertedId,
    ingredient_name,
    quantity,
    measure,
    cost
  };
};

module.exports = {
  generateIngredients,
  findIngredientByName
};
