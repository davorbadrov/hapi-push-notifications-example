var Actin = require('actin');
var Handlebars = require('handlebars');

exports.register = function (plugin, options, next) {
    var Autoloader = new Actin();
    plugin.dependency('controllers');

    var Controllers = Autoloader.controllersSync({folderName: '/controllers'});

    plugin.route([
        {method: 'POST', path: '/notification/send', config: Controllers.Push.send}
    ]);

    // Static files
    plugin.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public'
            }
        }
    });

    next();
};

exports.register.attributes = {
    name: 'routes',
    version: require('../package.json').version
}
