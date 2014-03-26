"use strict";

var VALIDATION_BYTE = 0x00,
    CLOSE_BYTE = 0x55;

function Command(name, value, validationByte, closeByte) {
    var _c = Object.create(this, {
        name: {
            value: name,
            enumerable: true
        },
        byteValue: {
            value: value,
            enumerable: true
        },
        validationByte: {
            value: validationByte || VALIDATION_BYTE
        },
        closeByte: {
            value: closeByte || CLOSE_BYTE
        },
        toString: {
            value: function () {
                return this.name;
            }
        },
        toHexBuffer: {
            value: function () {
                return new Buffer([this.byteValue, this.validationByte, this.closeByte], 'hex');
            }
        }
    });

    return _c;
}

exports.Command = Command;

function Sequence(name, sequence) {
    var values = [],
        i = 1;
    for (var value in sequence) {
        values.push({command: new Command(name + '-' + 1, value), timeout: sequence[value]});
        i += 1;
    }

    var _c = Object.create(this, {
        name: {
            value: name,
            enumerable: true
        },
        byteValues: {
            value: values,
            enumerable: true
        },
        toString: {
            value: function () {
                return this.name;
            }
        },
        toHexBuffer: {
            value: function () {
                var ret = [],
                    self = this;

                Object.keys(this.byteValues).forEach(function (cmd) {
                    ret.push({command: self.byteValues[cmd].command.toHexBuffer(), timeout: self.byteValues[cmd].timeout});
                });

                return ret;
            }
        }
    });

    return _c;
}

exports.Sequence = Sequence;
