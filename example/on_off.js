var led = require('../index'); //Normally require('LimitlessGEM');

var con = led.createSocket({ host: '192.168.1.105' });

[
    led.RGBW.ALL_OFF,
    led.RGBW.ALL_ON,
    led.RGBW.SET_COLOR_TO_VIOLET,
    led.RGBW.SET_COLOR_TO_ROYAL_MINT,
    led.RGBW.SET_COLOR_TO_YELLOW,
    led.RGBW.SET_COLOR_TO_PINK,
    led.RGBW.ALL_SET_TO_WHITE,
].forEach(function (cmd, index) {
   setTimeout(function () {
       con.send(cmd);
   }, index * 750);
});
