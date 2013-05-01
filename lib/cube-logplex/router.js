var heroku = require("./heroku-router");

module.exports = function(date, source, dyno, message) {
  if (source === "heroku" && dyno === "router") {
    heroku(date, source, dyno, message);
  }
};
