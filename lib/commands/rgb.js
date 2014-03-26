var c = require('./commands.js');

exports = module.exports = {
    ALL_OFF: 0x21,
    ALL_ON: 0x22,
    BRIGHTNESS_UP: 0x23,
    BRIGHTNESS_DOWN: 0x24,
    DISCO_SPEED_FASTER: 0x25, //SYNC
    DISCO_SPEED_SLOWER: 0x26,
    DISCO_MODE_NEXT: 0x27,
    DISCO_MODE_PREVIOUS: 0x28
};

Object.keys(exports).forEach(function (name) {
    exports[name] = new c.Command(name, exports[name]);
});
