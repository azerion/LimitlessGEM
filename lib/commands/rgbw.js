var c = require('./commands.js');

exports = module.exports = {
    ALL_OFF: 0x41,
    ALL_ON: 0x42,
    DISCO_SPEED_SLOWER: 0x43,
    DISCO_SPEED_FASTER: 0x44,
    ZONE_1_ON: 0x45,
    ZONE_1_OFF: 0x46,
    ZONE_2_ON: 0x47,
    ZONE_2_OFF: 0x48,
    ZONE_3_ON: 0x49,
    ZONE_3_OFF: 0x4A,
    ZONE_4_ON: 0x4B,
    ZONE_4_OFF: 0x4C,
    DISCO_MODE: 0x4D,
    ALL_WHITE: {
        0x42: 0,
        0xC2: 100
    },
    ZONE_1_WHITE: {
        0x45: 0,
        0xC5: 100
    },
    ZONE_2_WHITE: {
        0x47: 0,
        0xC7: 100
    },
    ZONE_3_WHITE: {
        0x49: 0,
        0xC9: 100
    },
    ZONE_4_WHITE: {
        0x4B: 0,
        0xCB: 100
    }
};

Object.keys(exports).forEach(function (name) {
    if (typeof exports[name] !== "object") {
        exports[name] = new c.Command(name, exports[name]);
    } else {
        exports[name] = new c.Sequence(name, exports[name]);
    }
});
