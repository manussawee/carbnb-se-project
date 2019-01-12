const loadConfig = (path) => {
  if (process.env.NODE_ENV === 'test') {
    // eslint-disable-next-line
    return require(`${path}.test`);
  }
  // eslint-disable-next-line
  return require(path);
};

module.exports = loadConfig('./config');
