'use strict'

const slackClient = require('../server/slackClient.js')
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);

const witToken = 'DHSHMQNG4CUHEW7WYALEH6WM3O27LSIL';
const witClient = require('../server/witClient')(witToken);
const slackToken = 'xoxb-103336484273-PCz5QObhmxgGZ5bVbMlSojgo';
const slackLogLevel = 'verbose';

const rtm = slackClient.init(slackToken, slackLogLevel, witClient);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', function() {
	console.log(`ATOM is listening on ${server.address().port} in ${service.get('env')} mode`);
});
