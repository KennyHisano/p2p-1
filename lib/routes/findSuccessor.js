'use strict';

var interval = require('../interval'),
    remote = require('../remote');

var findSuccessor = function (node) {
  return function (req, res) {
    var id = req.body.id;

    if (interval({ left: node.self.id, right: node.successor.id, type: 'leftopen' }).contains(id)) {
      return res.send(node.successor);
    }

    remote(node.self.host, node.self.port).run('find-predecessor', {
      id: id
    }, function (err, predecessor) {
      if (err) {
        return res.sendStatus(500);
      }

      remote(predecessor.host, predecessor.port).run('successor', function (errSuccessor, successor) {
        if (errSuccessor) {
          return res.sendStatus(500);
        }

        res.send(successor);
      });
    });
  };
};

module.exports = findSuccessor;