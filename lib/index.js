'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');
const Inert = require('inert');
const Path = require('path');
const config = require('config');

const server = new Hapi.Server();
server.connection({port: config.port || 3000});

server.register([
    Inert,
    Blipp,
    require('./controllers'),
    require('./routes'),
    require('./push')
], (err) => {
    server.start((err) => {
        if (err) {
            throw err;
        }

        console.log('Server running at:', server.info.uri);
    })
})

module.exports = server;
