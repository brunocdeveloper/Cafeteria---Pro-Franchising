const connection = require('../models/connection');

const userCheckExistence = async (email) => {
  const db = await connection();
  const user = db.collection('user').findOne({ email });
  return user;
};

module.exports = {
  userCheckExistence,
};
