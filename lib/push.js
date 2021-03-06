/**
 * Plugin which should enable sending Push notifications to Android phones,
 * works by getting mobile device tokens, one or multiple, and message data object
 * including message title and message text
 *
 * You can enable debug output by starting the app with the following flag:
 * DEBUG=node-gcm node app.js
 */
const gcm = require('node-gcm');
const config = require('config');
const Promise = require('bluebird');

exports.register = function(plugin, options, next) {
    debugger;
    const sender = new gcm.Sender(config.gcm.apiKey);
    var sendPush = Promise.promisify(sender.send, {context: sender});

    /**
     * Sends push message to an Android device
     *
     * @param  {any}    deviceTokens single or an array of device tokens
     * @param  {Object} messageData  object containing title and body
     * @param  {Object} options      options object, unused for now
     * @return {[type]}              nothing for now
     */
    const sendPushMessage = function (deviceTokens, messageData, options) {
        deviceTokens = [].concat(deviceTokens); // make sure it's an array
        var message = new gcm.Message({
            priority: 'high',
            contentAvailable: true,
            data: {
                keyTest: 'messageTest'
            },
            notification: {
                title: "Hello, World",
                icon: "ic_launcher",
                body: "This is a notification that will be displayed ASAP."
            }
        });

        message.addNotification('title', 'Alert!!!');

        message.addNotification({
            title: 'Alert!!!',
            body: 'Abnormal data access',
            icon: 'ic_launcher'
        });

        message.addData('key1', 'msg1');

        console.log(`send push message function, sending notification to ${deviceTokens[0]}`);

        return sendPush(message, {registrationTokens: deviceTokens});
    }

    plugin.expose('send', sendPushMessage);
    next();
};

exports.register.attributes = {
    name: 'push',
    version: require('../package.json').version
}
