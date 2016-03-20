'use strict';

const Boom = require('boom');
const path = require('path');

const internals = {};

module.exports.send = {
    handler: function(request, reply) {
        let token = request.payload.token;
        let data = {
            title: request.payload.title,
            body: request.payload.text
        };

        request.server.plugins.push.send(token, data)
        .then(function(data) {
            reply('Push notification send')
        })
        .catch(function(err) {
            console.error(err);
            reply(Boom.badImplementation('Notification sending failed'));
        })
    }
};
