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


con.send(led.RGBW.ALL_WHITE);
