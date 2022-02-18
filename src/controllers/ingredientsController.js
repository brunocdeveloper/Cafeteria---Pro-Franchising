const { findIngredientByName, generateIngredients, updateIngredients } = require("../models/ingredientsModel");

const createIngredients = async (req, res) => {
  const { name, quantity, measure, cost } = req.body;

  const ingredient = await findIngredientByName(name);

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

const editIngredientByName = async (req, res) => {
  const { body } = req;
  const editedIngredient = await updateIngredients(body);
  return res.status(200).json(editedIngredient);
}

module.exports = { 
  createIngredients,
  editIngredientByName,
}