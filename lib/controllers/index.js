/**
 * Module will read all the files syncronously,
 * cache them and expose them through the plugins.handlers property
 */
var glob = require('glob');
var path = require('path');

// load all the files from this directory and map them
var load = function (options, callback) {

    options = options || {};
    options.extension = options.extension || '.js';
    var controllers = {};

    var files = glob.sync('*' + options.extension, {cwd: options.path || __dirname});
    for(var i in files) {
        if (files[i] === 'index.js') continue;    // skip this file

        if (files[i] != path.basename(__filename)) {
            var key = path.basename(files[i], options.extension);
            key = key.charAt(0).toUpperCase() + key.slice(1);

            controllers[key] = require((options.path || __dirname) + '/' + files[i]);
        }
    }

    if (callback) {
        return callback(null, controllers);
    }


    console.log('read all controllers');
    return controllers;
};

exports.register = function (plugin, options, next) {

    load({path: __dirname}, function (err, handlers) {
        if (err) {
            throw err;
        }

        plugin.expose('handlers', handlers);
        next();
    });
};

exports.register.attributes = {
    name: 'controllers',
    version: require('../../package.json').version
};
