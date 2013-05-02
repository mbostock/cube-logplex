# Route Heroku Logs to Cube

First install [Cube](http://square.github.io/cube), along with [Node.js](http://nodejs.org) and [MongoDB](http://mongodb.org), if you haven’t already. This process is described on the [Cube wiki](https://github.com/square/cube/wiki). I recommend cloning the Cube git repository so that you can easily customize the dashboard.

Then, install **cube-logplex** globally:

```bash
npm install -g cube-logplex
```

Lastly, `cd` to the directory containing your heroku application, and start the log emitter by running `cube-logplex &`. This uses `heroku logs -t` internally, so you’ll need to have the Heroku toolbelt installed, too.

Currently the emitter assumes that you have the Cube collector running on localhost:1080. You can then access the Cube dashboard at [localhost:1081](http://localhost:1081).

When the emitter is running, you should see your [Heroku router info logs](https://devcenter.heroku.com/articles/logging) mapped to `heroku_info` events in Cube. For example:

```json
{"type": "heroku_info", "time": "2013-05-01T21:42:15.611Z", "data": {"at": "info", "method": "GET", "path": "/mbostock/raw/4341954/thumbnail.png", "host": "bl.ocks.org", "fwd": "192.168.1.1", "dyno": "web.1", "connect": 0, "service": 3, "status": 200, "bytes": 9888}}
{"type": "heroku_info", "time": "2013-05-01T21:42:15.606Z", "data": {"at": "info", "method": "GET", "path": "/mbostock/raw/4342045/thumbnail.png", "host": "bl.ocks.org", "fwd": "192.168.1.1", "dyno": "web.1", "connect": 1, "service": 8, "status": 200, "bytes": 23636}}
{"type": "heroku_info", "time": "2013-05-01T21:42:15.591Z", "data": {"at": "info", "method": "GET", "path": "/mbostock/raw/4348373/thumbnail.png", "host": "bl.ocks.org", "fwd": "192.168.1.1", "dyno": "web.1", "connect": 0, "service": 17, "status": 200, "bytes": 21027}}
{"type": "heroku_info", "time": "2013-05-01T21:42:15.591Z", "data": {"at": "info", "method": "GET", "path": "/mbostock/raw/4349187/thumbnail.png", "host": "bl.ocks.org", "fwd": "192.168.1.1", "dyno": "web.1", "connect": 0, "service": 5, "status": 200, "bytes": 11391}}
{"type": "heroku_info", "time": "2013-05-01T21:42:15.586Z", "data": {"at": "info", "method": "GET", "path": "/mbostock/raw/4343214/thumbnail.png", "host": "bl.ocks.org", "fwd": "192.168.1.1", "dyno": "web.1", "connect": 0, "service": 11, "status": 200, "bytes": 49849}}
{"type": "heroku_info", "time": "2013-05-01T21:42:15.578Z", "data": {"at": "info", "method": "GET", "path": "/mbostock/raw/4347473/thumbnail.png", "host": "bl.ocks.org", "fwd": "192.168.1.1", "dyno": "web.1", "connect": 1, "service": 5, "status": 200, "bytes": 18173}}
{"type": "heroku_info", "time": "2013-05-01T21:42:15.541Z", "data": {"at": "info", "method": "GET", "path": "/mbostock/raw/4349545/thumbnail.png", "host": "bl.ocks.org", "fwd": "192.168.1.1", "dyno": "web.1", "connect": 0, "service": 13, "status": 200, "bytes": 11911}}
{"type": "heroku_info", "time": "2013-05-01T21:42:15.537Z", "data": {"at": "info", "method": "GET", "path": "/mbostock/raw/4349509/thumbnail.png", "host": "bl.ocks.org", "fwd": "192.168.1.1", "dyno": "web.1", "connect": 0, "service": 7, "status": 200, "bytes": 5289}}
```

If your app also logs custom events as JSON objects with a `type` property, these will be mapped to Cube events as well. For example, the following app logs will be transformed to `api_request` and `api_response` events:

```
2013-05-02T00:40:43.439953+00:00 app[web.1]: {"type":"api-request","path":"/gists/5001347"}
2013-05-02T00:40:43.649308+00:00 app[web.1]: {"type":"api-response","path":"/gists/5001347","duration":210}
2013-05-02T00:40:47.485454+00:00 app[web.1]: {"type":"api-request","path":"/gists/3077915"}
2013-05-02T00:40:47.714644+00:00 app[web.1]: {"type":"api-response","path":"/gists/3077915","duration":229}
```

As follows:

```json
{"type": "api-request", "time": "2013-05-02T00:40:43.439Z", "data": {"path": "/gists/5001347"}}
{"type": "api-response", "time": "2013-05-02T00:40:43.649Z", "data": {"path": "/gists/5001347", "duration":210}}
{"type": "api-request", "time": "2013-05-02T00:40:47.485Z", "data": {"path": "/gists/3077915"}}
{"type": "api-response", "time": "2013-05-02T00:40:47.714Z", "data": {"path": "/gists/3077915", "duration":229}}
```

If you want to design a custom dashboard for your Heroku app, use the ["random" example](https://github.com/square/cube/blob/master/static/random/index.html) in Cube’s `static` directory.
