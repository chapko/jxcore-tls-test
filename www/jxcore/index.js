var tls = require('tls');

if (typeof Mobile !== 'undefined') {
  Mobile('run').registerSync(run);
}

var pskId = 'psk-id';
var pskKey = new Buffer('psk-key');
var ciphers = 'PSK-AES256-CBC-SHA';

function run (address, data) {
  var pair = address.trim().split(':');
  var host = pair[0];
  var port = Number(pair[1]);

  if (isNaN(port)) {
    throw new Error('Port is not a number');
  }

  console.log('Connecting to %s:%d', host, port);
  var client = tls.connect({
    host: host,
    port: port,
    ciphers: ciphers,
    pskIdentity: pskId,
    pskKey: pskKey
  }, function () {
    console.log('Connected');
    connectionEstablished(client, data)
  });
}

function connectionEstablished(client, data) {
  client.on('data', function (chunk) {
    console.log('Received:', chunk.toString());
  });

  client.on('end', function () {
    console.log('Client stream ended');
  });

  client.on('error', function (error) {
    console.log('Client received error:', error.message);
    console.log(error.stack);
  });

  console.log('Sending:', data.toString());
  client.write(data);
}

exports.run = run;
