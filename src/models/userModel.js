const connection = require('./connection');

const registerUser = async ({ name, email, password }) => {
  const db = await connection();
  const user = await db.collection('user').insertOne({
    name,
    email,
    password,
  });
  
  return {
    user: {
      _id: user.insertedId,
      name,
      email,
    }
  }
};

module.exports = {
  registerUser,
};
