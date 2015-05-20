'use strict';

var hex = require('../hex'),
    Node = require('../Node'),
    random = require('../random'),
    remote = require('../remote');

var fixFingers = function (node) {
  return function (req, res) {
    var i = random(2, 160),
        id = hex.add(node.self.id, hex.pow2x(i - 1));

    remote(node.self.host, node.self.port).run('find-successor', {
      id: id
    }, function (err, successor) {
      if (err) {
        return res.sendStatus(500);
      }

      node.fingers[i] = new Node({
        host: successor.host,
        port: successor.port
      });

      res.sendStatus(200);
    });
  };
};

module.exports = fixFingers;