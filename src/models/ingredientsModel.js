const connection = require('./connection');

const findIngredientByName = async (name) => {
  const db = await connection();
  const ingredient = await db.collection('ingredients').findOne({ name });
  return ingredient;
};

const generateIngredients = async ({ name, quantity, measure, cost }) => {
  const db = await connection();
  const ingredient = db.collection('ingredients').insertOne({
    name,
    quantity,
    measure,
    cost,
  })

  return {
    _id: ingredient.insertedId,
    name,
    quantity,
    measure,
    cost
  };
};

module.exports = {
  generateIngredients,
  findIngredientByName
};
