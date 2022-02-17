const { registerUser } = require('../models/userModel');
const { userCheckExistence } = require('../services/users');

const createUser = async (req, res) => {
  const { name, password, email } = req.body;
  const existenceUser = await userCheckExistence(email);
  if (existenceUser) {
    return res.status(409).json(
      { message: 'Conflict. user already exists' }
    )
  }

  const newUser = await registerUser({ name, email, password });
  return res.status(201).json(newUser);
};

module.exports = {
  createUser,
};
