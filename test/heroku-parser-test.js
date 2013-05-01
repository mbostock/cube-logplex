var vows = require("vows"),
    assert = require("assert"),
    parser = require("../lib/cube-logplex/heroku-parser");

var suite = vows.describe("cube-logplex.heroku-parser");

suite.addBatch({
  "heroku-parser": {
    "parses a key=value token": function() {
      assert.deepEqual(parser("at=info"), {"at": "info"});
    },
    "parses multiple key=value tokens": function() {
      assert.deepEqual(parser("at=info foo=bar"), {"at": "info", "foo": "bar"});
    },
    "ignores a trailing whitespace": function() {
      assert.deepEqual(parser("at=info foo=bar "), {"at": "info", "foo": "bar"});
    },
    "supports quoted values": function() {
      assert.deepEqual(parser("at=info foo=\"bar baz\""), {"at": "info", "foo": "bar baz"});
      assert.deepEqual(parser("foo=\"bar baz\" at=info"), {"at": "info", "foo": "bar baz"});
      assert.deepEqual(parser("at=info foo=\"bar baz\" one=two"), {"at": "info", "foo": "bar baz", "one": "two"});
    }
  }
});

suite.export(module);
