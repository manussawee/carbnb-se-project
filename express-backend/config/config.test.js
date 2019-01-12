module.exports = {
  db: {
    host: process.env.DB_URI || 'localhost',
    port: process.env.DB_PORT || 27018,
    dbName: 'carbnb_database',
  },
  auth: {
    jwt: {
      key: 'c3RvcCBkZWNvZGluZyBteSBrZXlz',
      issuer: 'carbnb.test',
      audience: 'carbnb.test',
    },
  },
};
