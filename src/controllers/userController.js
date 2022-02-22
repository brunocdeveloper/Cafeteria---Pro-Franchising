const md5 = require("md5");

const { registerUser } = require("../models/userModel");
const { findUser } = require("../services/users");

/* 
  Casa o usuário não exista, cria um usuário
  e encriptografa a senha.
*/
const createUser = async (req, res) => {
	const { name, password, email } = req.body;
	const encryptPassword = md5(password);
	const existenceUser = await findUser(email);
	if (existenceUser) {
		return res.status(409).json(
			{ message: "Conflict. user already exists" }
		);
	}

	const newUser = await registerUser({ name, email, password: encryptPassword });
	return res.status(201).json(newUser);
};

module.exports = {
	createUser,
};
