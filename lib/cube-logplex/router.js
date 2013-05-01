var parse = require("./message-parser");

var cube = require("cube");

var emitter = cube.emitter("ws://127.0.0.1:1080"); // TODO configure

process.on("SIGINT", function() {
  emitter.close();
});

module.exports = function(date, source, dyno, message) {
  if (source === "heroku" && dyno === "router") {
    message = parse(message);
    if (message.at === "info") {
      if ("connect" in message) message.connect = +message.connect.slice(0, -2);
      if ("service" in message) message.service = +message.service.slice(0, -2);
      if ("status" in message) message.status = +message.status;
      if ("bytes" in message) message.bytes = +message.bytes;
      emitter.send({
        type: "heroku_info",
        time: date,
        data: message
      });
    }
  }
};
