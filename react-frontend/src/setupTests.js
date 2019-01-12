// eslint-disable-next-line
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener() {},
    removeListener() {},
  };
};
