const validateIngredientName = (req, res, next)  => {
  const { name } = req.body;

  if(!name) return res.status(401).json({ message: `${name} cannot be empty`})

  next();
};

const validateIngredientQuantity = (req, res, next) => {
  const { quantity } = req.body;

  if(!quantity) return res.status(401).json({ message: `${quantity} cannot be empty`})

  next();
};

const validateIngredientMeasure = (req, res, next) => {
  const { measure } = req.body;

  if(!measure) return res.status(401).json({ message: `${measure} cannot be empty`})

  next();
};

const validateIngredientCost = (req, res, next) => {
  const { cost } = req.body;

  if (!cost || !cost.price || !cost.measurement || !cost.size) {
    return res.status(401).json({ message: `Cost fields cannot be empty`})
  }
  
  next();
};

module.exports = {
  validateIngredientName,
  validateIngredientQuantity,
  validateIngredientMeasure,
  validateIngredientCost
};
