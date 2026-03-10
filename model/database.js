const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => {
  if (database) {
    return callback(null, database);
  }

  const uri = process.env.MONGODB_URI || process.env.URI;

  if (!uri) {
    return callback(
      new Error('MONGODB_URI (or URI) is not set in environment variables')
    );
  }

  MongoClient.connect(uri)
    .then((client) => {
      const dbName = process.env.MONGODB_DB_NAME || 'cse341';
      database = client.db(dbName);
      callback(null, database);
    })
    .catch((error) => {
      callback(error);
    });
};

const getDb = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }

  return database;
};

module.exports = {
  initDb,
  getDb,
};
