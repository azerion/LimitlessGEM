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
