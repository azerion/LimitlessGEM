var dgram = require('dgram'),
    logger = require('log4js').getLogger();

var VALIDATION_BYTE = 0x00,
    CLOSE_BYTE = 0x55;


function LimitlessLED(addr, port) {
    this.addr = addr;
    this.port = port;
    this.client = dgram.createSocket('udp4');
}

LimitlessLED.prototype = Object.create({}, {
    send: {
        value: function (cmd) {
            logger.info('sending: ', cmd)
            var self = this,
                buffer = new Buffer([cmd, VALIDATION_BYTE, CLOSE_BYTE], 'hex');

            function cb(err, bytes) {
                if (err) {
                    logger.info("udp error:" + err);
                    throw new Error(err);
                } else {
                    logger.info('bytes send: ', [cmd, VALIDATION_BYTE, CLOSE_BYTE], 'to: ', self.addr + ':' + self.port);
                }
            }

            this.client.send(
                buffer,
                0,
                3,
                self.port,
                self.addr,
                cb
            );
        }
    }
});

exports.LimitlessLED = LimitlessLED;