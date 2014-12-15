var dgram = require('dgram'),
    net = require('net'),
    logger = require('log4js').getLogger();

var CLOSE_BYTE = 0x55,
    TYPE_UDP = 'udp',
    TYPE_TCP = 'tcp';


function LimitlessLED(params) {
    this.addr = params.host;
    this.port = params.port;
    this.type = params.type;

    callback = (typeof(params.callback) === "function") ? params.callback : function () {};

    switch (this.type) {
        case TYPE_UDP:
            this.client = dgram.createSocket('udp4');
            break;
        case TYPE_TCP:
            this.client = net.connect(params, params.callback);
            break;
        default:
            throw new Error('Invalid type');
    }
}

LimitlessLED.prototype = Object.create({}, {
    send: {
        value: function (cmd) {
            var buffer = new Buffer(cmd.concat(CLOSE_BYTE), 'hex');
            logger.info('sending: ', buffer);

            switch (this.type) {
                case TYPE_UDP:
                    this.sendUdp(buffer);
                    break;
                case TYPE_TCP:
                    this.sendTcp(buffer);
                    break;
            }
        },
        enumerable: true
    },
    sendUdp: {
        value: function (buffer, cb) {
            var self = this;

            cb = (typeof(cb) === "function") ? cb : function (err, bytes) {
                if (err) {
                    logger.info("udp error:" + err);
                    throw new Error(err);
                } else {
                    logger.info('bytes send: ', buffer, 'to: ', self.addr + ':' + self.port);
                }
            }

            this.client.send(
                buffer,
                0,
                buffer.length,
                self.port,
                self.addr,
                cb
            );
        }
    },
    sendTcp: {
        value: function (buffer, cb) {
            this.client.write(buffer);
        }
    }
});

exports.LimitlessLED = LimitlessLED;
