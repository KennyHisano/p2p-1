'use strict';

var fs = require('fs'),
    path = require('path');

var p2p = require('../../lib/p2p');

/* eslint-disable no-process-env  */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
/* eslint-enable no-process-env  */

p2p.peer({
  /* eslint-disable no-process-env */
  host: process.env.HOST,
  port: process.env.PORT,
  /* eslint-enable no-process-env */
  privateKey: fs.readFileSync(path.join(__dirname, '..', '..', 'keys', 'localhost.selfsigned', 'privateKey.pem')),
  certificate: fs.readFileSync(path.join(__dirname, '..', '..', 'keys', 'localhost.selfsigned', 'certificate.pem')),
  serviceInterval: '1s'
});