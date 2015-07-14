'use strict';

var url = require('url');

var flaschenpost = require('flaschenpost'),
    processEnv = require('processenv'),
    request = require('request'),
    uuid = require('uuidv4');

var logger = flaschenpost.getLogger();

var port = processEnv('PORT') || 3000;

var job = {
  id: process.argv[2] || uuid(),
  data: process.argv[3] || 'foo'
};

request.post(url.format({
  protocol: 'http',
  hostname: 'localhost',
  port: port,
  pathname: '/job'
}), {
  body: { value: job.id, data: job.data },
  json: true
}, function (err, res) {
  if (err || (res.statusCode !== 200)) {
    logger.fatal('Failed to send job.', err);
    /* eslint-disable no-process-exit */
    process.exit(1);
    /* eslint-enable no-process-exit */
  }

  logger.info('Sent job {{job.id}} to {{target.host}}:{{target.port}}.', {
    job: job,
    target: res.body.node
  });
});