var led = require('../index'); //Normally require('LimitlessGEM');

var con = led.createSocket({
        host: '192.168.1.105',
        port: 8899
    },
    'tcp',
    function () {
        console.log('connected');
    }
);

[
    led.RGBW.ZONE_1_ON,
    led.RGBW.ZONE_1_OFF,
    led.RGBW.ZONE_1_ON,
    led.RGBW.ZONE_1_OFF
].forEach(function (cmd, index) {
   setTimeout(function () {
       con.send(cmd);
   }, index * 750);
});
