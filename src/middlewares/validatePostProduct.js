const validateProductName = (req, res, next)  => {
  const { name } = req.body;

  if(!name) return res.status(401).json({ message: `${name} cannot be empty`})

  next();
};

const validateProductPrice = (req, res, next) => {
  const { price } = req.body;

  if(!price) return res.status(401).json({ message: `${price} cannot be empty`})

  next();
}

const validateProductIngredients = (req, res, next) => {
  const { ingredients } = req.body;
  ingredients.map((items) => {
    if (!items.name || !items.measure || !items.quantity) {
      return res.status(401).json({ message: `Ingredients fields cannot be empty`})
    }
  });
  next();
}

module.exports = {
  validateProductName,
  validateProductPrice,
  validateProductIngredients,
}