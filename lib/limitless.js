var dgram = require('dgram'),
    net = require('net'),
    logger = require('log4js').getLogger(),
    Command  = require('./commands/commands.js').Command,
    Sequence  = require('./commands/commands.js').Sequence;

var TYPE_UDP = 'udp',
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
            var method;

            logger.info('sending: ', cmd.toHexBuffer());

            if (!(cmd instanceof Command) && !(cmd instanceof Sequence)) {
                throw new Error("Invalid command");
            }

            switch (this.type) {
                case TYPE_UDP:
                    method = this.sendUtp.bind(this);
                    break;
                case TYPE_TCP:
                    method = this.sendTcp.bind(this);
                    break;
            }

            if (cmd instanceof Command) {
                method(cmd.toHexBuffer());
            } else if (cmd instanceof Sequence) {
                cmd.toHexBuffer().forEach(function (sq) {
                    setTimeout(function () {
                        method(sq.command);
                    }, sq.timeout);
                });
            }
        },
        enumerable: true
    },
    sendUtp: {
        value: function (buffer, cb) {
            var self = this;

            cb = (typeof(cb) === "function") ? cb : function (err, bytes) {
                if (err) {
                    logger.info("udp error:" + err);
                    throw new Error(err);
                } else {
                    logger.info('bytes send: ', buffer, 'to: ', self.addr + ':' + self.port);
                }
            };

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
