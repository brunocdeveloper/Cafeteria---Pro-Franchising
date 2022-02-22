const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DBserver = new MongoMemoryServer();

const getConnection = async () => {
  const URLMock = await DBserver.getUri();
  return MongoClient.connect(URLMock);
}

module.exports = { getConnection, DBserver };
