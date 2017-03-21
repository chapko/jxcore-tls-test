var ts = require('./test-server');
var app = require('./index');

ts.start(3000, function (err) {
  if (err) {
    throw err;
  }

  app.run('localhost:3000', 'hello world');
});
