const connection = require('../models/connection');

const findUser = async (email) => {
  const db = await connection();
  const user = db.collection('user').findOne({ email });
  return user;
};

module.exports = {
  findUser,
};
