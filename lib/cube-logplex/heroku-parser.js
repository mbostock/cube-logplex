module.exports = function(message) {
  var i = -1,
      n = message.length,
      o = {};

  // While there are key=value tokens left to parse,
  while (++i < n) {

    // Read the key, up to "=" (61).
    var j = i + 1;
    while (message.charCodeAt(j) !== 61) if (j++ >= n) return o;

    // Read the value, up to " " (32).
    var k = j + 1, m = 0;
    if (message.charCodeAt(k) === 34) {
      ++k, m = 1;
      while (message.charCodeAt(k) !== 34) if (k++ >= n) return o;
    } else {
      while (message.charCodeAt(k) !== 32) if (k++ >= n) break;
    }

    o[message.substring(i, j)] = message.substring(j + 1 + m, k);

    i = k + m;
  }

  return o;
};
