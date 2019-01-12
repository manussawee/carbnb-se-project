const useConfiguration = (name, defaultValue) => {
  if (process.env[name]) return process.env[name];
  return defaultValue;
};

module.exports = {
  db: {
    host: useConfiguration('DB_URI', 'localhost'),
    port: useConfiguration('DB_PORT', 27017),
    dbName: useConfiguration('DB_DBNAME', 'carbnb_database'),
    username: useConfiguration('DB_USERNAME'),
    password: useConfiguration('DB_PASSWORD'),
  },
  auth: {
    jwt: {
      key: useConfiguration('JWT_KEY', 'eW91IGhhdmUgZGVjb2RlZCB0aGUga2V5LiBnaiBuZXJk'),
      issuer: useConfiguration('JWT_ISSUER', 'carbnb.com', null, false),
      audience: useConfiguration('JWT_AUDIENCE', 'carbnb.com', null, false),
    },
  },
};
