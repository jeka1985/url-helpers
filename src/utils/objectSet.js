const isObject = require('./isObject');

module.exports = function set(dest, path, value) {
  let target = dest,
      keys = Array.isArray(path) ? path : path.split('.');

  keys.forEach((key, i) => {
    if (i == (keys.length - 1)) {
      target[key] = value;
    } else {
      if (!isObject(target[key])) {
        target[key] = {};
      }
      target = target[key];
    }
  });

  return dest;   
}