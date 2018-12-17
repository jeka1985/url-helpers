const isObject = require('./isObject');

module.exports = function get(src = {}, path = '', def) {
  var entry = isObject(src) ? src : {},
      stop;

  (Array.isArray(path) ? path : String(path).split('.')).forEach(key => {
    if (!stop && entry && entry.hasOwnProperty(key) && entry[key] !== undefined) {
      entry = entry[key];
    } else {
      entry = def;
      stop = true;
    }
  });

  return entry;
}