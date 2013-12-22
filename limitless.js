var LimitGEM = require('./lib/limitless.js');

var client = new LimitGEM.LimitlessLED('192.168.1.105', '8899');

var cmd = process.argv[2];

if (cmd == 'on') {
    client.send(LimitGEM.RGBW.ZONE_1_ON);
    client.send(LimitGEM.RGBW.ZONE_1_ON);
    client.send(LimitGEM.RGBW.ZONE_1_ON);
    client.send(LimitGEM.RGBW.ZONE_1_ON);
} else {
    client.send(LimitGEM.RGBW.ZONE_1_OFF);
    client.send(LimitGEM.RGBW.ZONE_1_OFF);
    client.send(LimitGEM.RGBW.ZONE_1_OFF);
    client.send(LimitGEM.RGBW.ZONE_1_OFF);
}