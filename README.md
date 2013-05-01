# Piping Heroku Logs to Cube

## Installing

<https://github.com/square/cube/wiki>

```bash
npm install -g cube-logplex
```

Then, `cd` to the directory containing your heroku application, and start the emitter by running `cube-logplex &`. Currently the emitter assumes that you have the Cube collector running on localhost:1080.
