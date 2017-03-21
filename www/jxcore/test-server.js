var tls = require('tls');

var pskId = 'psk-id';
var pskKey = new Buffer('psk-key');
var ciphers = 'PSK-AES256-CBC-SHA';

var server = tls.createServer({
  ciphers: ciphers,
  pskCallback: function (id) {
    return id === pskId ? pskKey : null
  },
}, function (socket) {
  socket.pipe(socket);
});

module.exports.start = function (port, cb) {
  server.once('error', cb);
  server.listen(port, function () {
    server.removeListener('error', cb);
    cb(null, server);
  });
}

