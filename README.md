# Route Heroku Logs to Cube

## Installing

First install [Cube](http://square.github.io/cube), along with [Node.js](http://nodejs.org) and [MongoDB](http://mongodb.org), if you haven’t already. This process is described on the [Cube wiki](https://github.com/square/cube/wiki).

Then, install cube-logplex:

```bash
npm install -g cube-logplex
```

Lastly, `cd` to the directory containing your heroku application, and start the emitter by running `cube-logplex &`. Currently the emitter assumes that you have the Cube collector running on localhost:1080. You can then access the Cube dashboard at [localhost:1081](http://localhost:1081).

If you want to design a custom dashboard for your Heroku app, use the ["random" example](https://github.com/square/cube/blob/master/static/random/index.html) in Cube’s `static` directory.
