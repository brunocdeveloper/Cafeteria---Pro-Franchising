const { findIngredientByName, generateIngredients } = require("../models/ingredientsModel");

const createIngredients = async (req, res) => {
  const { name, quantity, measure, cost } = req.body;

  const ingredient = await findIngredientByName(name);
  console.log()

  if(ingredient) {
    return res.status(409).json(
      { message: `${name} already exists. Maybe the best is to edit it`}
    );
  }

  const newIngredient = await generateIngredients({
    name, quantity, measure, cost
  });

  return res.status(201).json(newIngredient);
}

module.exports = { 
  createIngredients,
}