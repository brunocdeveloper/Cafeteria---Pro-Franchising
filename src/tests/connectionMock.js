const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DBserver = new MongoMemoryServer();

const Options = { useNewUrlParser: true, useUnifiedTopologo: true};

const getConnection = async () => {
  const URLMock = await DBserver.getUri();
  return MongoClient.connect(URLMock);
}

module.exports = { getConnection };
