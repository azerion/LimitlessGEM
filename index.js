var limitless = require('./lib/limitless').LimitlessLED;

exports.RGB = require('./lib/commands/rgb');
exports.RGBW = require('./lib/commands/rgbw');
exports.WHITE = require('./lib/commands/white');

exports.createSocket = function (opts, type, callback) {
    var params = {
        host: (opts.host || '10.10.10.100'),
        port: (opts.port || 8899),
        type: (type || 'udp'),
        callback: callback
    };

    return new limitless(params);
}
